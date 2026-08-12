export interface DocumentChangeMessage {
	type: "documentChanged";
	editId: number;
	baseVersion: number;
	algorithm: unknown[];
}

interface QueuedDocumentEdit {
	editId: number;
	algorithm: unknown[];
	serialized: string;
}

export class EditorDocumentController {
	private acknowledgedVersion = 0;
	private acknowledgedDocument = "";
	private nextEditId = 1;
	private queue: QueuedDocumentEdit[] = [];
	private inFlight: QueuedDocumentEdit | undefined;
	private commitScheduled = false;
	private hydrationDepth = 0;

	constructor(
		private readonly serialize: () => unknown[],
		private readonly send: (message: DocumentChangeMessage) => void,
	) {}

	commit(): void {
		if (this.hydrationDepth > 0 || this.commitScheduled) return;
		this.commitScheduled = true;
		queueMicrotask(() => {
			this.commitScheduled = false;
			if (this.hydrationDepth > 0) return;
			const algorithm = this.serialize();
			const serialized = JSON.stringify(algorithm);
			const latest = this.queue.at(-1)?.serialized ??
				this.inFlight?.serialized ?? this.acknowledgedDocument;
			if (serialized === latest) return;
			this.queue.push({
				editId: this.nextEditId++,
				algorithm,
				serialized,
			});
			this.pump();
		});
	}

	accept(editId: number, version: number): void {
		if (this.inFlight?.editId !== editId) return;
		this.acknowledgedDocument = this.inFlight.serialized;
		this.acknowledgedVersion = version;
		this.inFlight = undefined;
		this.pump();
	}

	replaceAuthoritative(version: number, hydrate: () => void): void {
		this.queue = [];
		this.inFlight = undefined;
		this.hydrationDepth++;
		try {
			hydrate();
			this.acknowledgedVersion = version;
			this.acknowledgedDocument = JSON.stringify(this.serialize());
		} finally {
			this.hydrationDepth--;
		}
	}

	private pump(): void {
		if (this.inFlight || this.queue.length === 0) return;
		this.inFlight = this.queue.shift();
		if (!this.inFlight) return;
		this.send({
			type: "documentChanged",
			editId: this.inFlight.editId,
			baseVersion: this.acknowledgedVersion,
			algorithm: this.inFlight.algorithm,
		});
	}
}
