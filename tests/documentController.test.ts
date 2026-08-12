import { describe, expect, test } from "bun:test";
import {
	EditorDocumentController,
	type DocumentChangeMessage,
} from "../src/runtime/documentController";

const flushCommit = () => Promise.resolve();

describe("EditorDocumentController", () => {
	test("queues rapid commits FIFO and advances versions only on matching acknowledgements", async () => {
		let algorithm: unknown[] = [];
		const messages: DocumentChangeMessage[] = [];
		const controller = new EditorDocumentController(
			() => structuredClone(algorithm),
			(message) => messages.push(message),
		);
		controller.replaceAuthoritative(4, () => undefined);

		algorithm = [{ typeElement: "Probleme", libelle: "one" }];
		controller.commit();
		await flushCommit();
		algorithm = [{ typeElement: "Probleme", libelle: "two" }];
		controller.commit();
		await flushCommit();

		expect(messages).toHaveLength(1);
		expect(messages[0]).toMatchObject({ editId: 1, baseVersion: 4 });
		controller.accept(999, 5);
		expect(messages).toHaveLength(1);
		controller.accept(1, 5);
		expect(messages).toHaveLength(2);
		expect(messages[1]).toMatchObject({ editId: 2, baseVersion: 5 });
		controller.accept(2, 6);
	});

	test("deduplicates identical snapshots and cancels pending work on replacement", async () => {
		let algorithm: unknown[] = [];
		const messages: DocumentChangeMessage[] = [];
		const controller = new EditorDocumentController(
			() => structuredClone(algorithm),
			(message) => messages.push(message),
		);
		controller.replaceAuthoritative(1, () => undefined);
		controller.commit();
		await flushCommit();
		expect(messages).toHaveLength(0);

		algorithm = [{ typeElement: "Probleme" }];
		controller.commit();
		await flushCommit();
		expect(messages).toHaveLength(1);

		algorithm = [{ typeElement: "DictionnaireDonnee" }];
		controller.commit();
		await flushCommit();
		controller.replaceAuthoritative(8, () => {
			algorithm = [];
			controller.commit();
		});
		controller.accept(1, 2);
		expect(messages).toHaveLength(1);

		controller.commit();
		await flushCommit();
		expect(messages).toHaveLength(1);
	});
});
