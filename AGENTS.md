# Editor AGENTS Guide

This document is a deep, editor-focused companion to the root `AGENTS.md`. It explains the **front-editeur** runtime, data model, and build pipeline in detail, with concrete file references. It is intentionally exhaustive so you can reason about behavior before touching code.

If you only read one file, start with `src/front-editeur/src/PartieEditeur/Editeur.js` because it wires almost every subsystem.

**Where The Editor Lives**
- Entry HTML: `src/front-editeur/src/index.html`
- Core editor class: `src/front-editeur/src/PartieEditeur/Editeur.js`
- Workspace model: `src/front-editeur/src/PartieEditeur/PlanTravail.js`
- Element base + links: `src/front-editeur/src/PartieEditeur/ElementGraphique.js`, `src/front-editeur/src/PartieEditeur/ElementParent.js`
- Specialized elements: `src/front-editeur/src/PartieEditeur/Probleme.js`, `src/front-editeur/src/PartieEditeur/Procedure.js`, `src/front-editeur/src/PartieEditeur/StructureSi.js`, `src/front-editeur/src/PartieEditeur/StructureSwitch.js`, `src/front-editeur/src/PartieEditeur/StructureIterative*.js`, `src/front-editeur/src/PartieEditeur/ConditionSortie.js`, `src/front-editeur/src/PartieEditeur/Condition.js`
- Selection + drag: `src/front-editeur/src/PartieEditeur/Selection.js`, `src/front-editeur/src/PartieEditeur/SelectionRectangle.js`, `src/front-editeur/src/PartieEditeur/RepresentationSelectionSimple.js`
- Linking visuals: `src/front-editeur/src/PartieEditeur/Lien*.js`, `src/front-editeur/src/PartieEditeur/Ligne.js`, `src/front-editeur/src/PartieEditeur/SymboleDecomposition.js`
- Undo/redo events: `src/front-editeur/src/PartieEditeur/EvenementEdition/*`
- Dictionary UI: `src/front-editeur/src/PartieEditeur/DictionnaireDonnee.js`
- Library UI: `src/front-editeur/src/PartieEditeur/Bilbiotheque.js`, `src/front-editeur/src/PartieEditeur/InviteNouvelleBibliotheque.js`
- Menus + context menus: `src/front-editeur/src/PartieEditeur/MenuContextuel.js`, `src/front-editeur/src/PartieEditeur/MenuDeroulant.js`, `src/front-editeur/src/PartieEditeur/ElementMenu*.js`
- Zoom + theme: `src/front-editeur/src/PartieEditeur/IndicateurZoom.js`, `src/front-editeur/src/PartieEditeur/ThemeEditeur.js`, `src/front-editeur/src/PartieEditeur/MenuCompte.js`
- Error detection: `src/front-editeur/src/PartieErreur/*`
- Build script: `src/front-editeur/SmeltJS.ts`

**Build And Output**
- Source HTML is `src/front-editeur/src/index.html` and references many local scripts via `<script src="…">`.
- The build step is `src/front-editeur/SmeltJS.ts`.
- Build behavior:
- It parses `index.html`, collects all **local** script tags in order, concatenates them, removes the original script tags, and inlines the combined JS at the end of `<body>`.
- It inlines CSS by replacing `<link rel="stylesheet" href="style.css">` with a `<style>` tag containing minified CSS.
- It copies `src/front-editeur/src/modales/*` and `src/front-editeur/src/Audio/*` to `src/front-editeur/out/`.
- Output target is `src/front-editeur/out/index.html` plus the copied directories and minified CSS.
- Because scripts are concatenated **in DOM order**, the order in `index.html` matters for class definitions and globals. Keep the polyfill and base classes early.

**Runtime Globals And Flags**
Defined in `src/front-editeur/src/index.html`:
- `isElectron`: disables `beforeunload` confirm if true.
- `isExam`: disables library, glow/dock effects, and error UI; can also load `exam-style.css`.
- `verbose`: console debug switch used throughout the editor.
- `preferences`: `{ glow, dockEffect, renderScale }`.
- `preferences.renderScale` controls export resolution (PNG/JPG) in `Editeur.createBitmapImageFromSvg`.

**High-Level DOM Structure**
`src/front-editeur/src/index.html` builds a hierarchy like:
- `<editeur-interface>` (custom element, `Editeur` class)
- `<header>` with title, menus, theme select, and optional cloud save button.
- A dock-like tool bar with icons (pointer, link, elements).
- `#espacePrincipal_wrapper` containing `<plan-travail id="espacePrincipal">` plus dictionary and library containers.
- A hidden `<canvas id="canvasExport">` used for bitmap exports.

**Script Load Order And Why It Matters**
The script list at the bottom of `index.html` is intentionally ordered. A few critical notes:
- `modules/safari-pollyfill.js` must be loaded early for Custom Elements in Safari.
- `Type`, `Information`, `DictionnaireDonnee` come before elements because many elements rely on them for dictionary extraction.
- `PartieErreur/*` is loaded early so `rechercherAnomalies` can instantiate classes.
- Base element classes (`ElementGraphique`, `ElementParent`, `Lien`, `Ligne`) are loaded before specific elements.
- `Editeur.js` must be last, because it references almost everything else.
- The build script uses these tags to generate the bundled output; reordering will affect runtime.

**Coordinate System And Zoom**
The editor **stores positions in `vw` units** and uses a global scale factor via CSS:
- All element positions are stored in `_abscisse` and `_ordonnee` (strings like `"12vw"`).
- All position calculations use **width-based scaling** (both X and Y are derived from `window.innerWidth`).
- Zoom is implemented by the CSS variable `--sizeModifier` set on `<body>`.
- `IndicateurZoom` (`src/front-editeur/src/PartieEditeur/IndicateurZoom.js`) updates `--sizeModifier` and stores the zoom in a cookie.
- If you add new UI that depends on coordinates, convert px to vw using the same `window.innerWidth` pattern to remain consistent with existing logic.

**Core Editor Lifecycle**
`Editeur` (`src/front-editeur/src/PartieEditeur/Editeur.js`) performs the following on construction:
- Installs modals by loading HTML from `src/front-editeur/src/modales/*.html` and wrapping them in `FenetreModale`.
- Sets up event listeners for title editing, menu actions, toolbar buttons, keyboard shortcuts, and mouse interactions.
- Initializes tools and supported element types in `_typesElements`.
- Creates and attaches selection overlays and the zoom control.
- Initializes dictionary and library panels.
- Loads theme from cookie and applies it via `ThemeEditeur`.
- Sets up cloud save/load and mutation observers when URL hash looks like `#/id`.

**Element Model And Link Graph**
All visual nodes are custom elements extending `ElementGraphique`:
- `ElementGraphique` defines `_abscisse`, `_ordonnee`, `_parent`, `getCentre()`, `getTaille*()`, and `setPosition()`.
- `ElementParent` is a helper that stores child links and handles linking/unlinking and line updates.
- Every decomposable element holds an `_elemParent` instance.
- Links are drawn using `Lien*` classes, which use `ligne-element` segments:
- `LienDroit` draws a single line from parent decomposition anchor to child composition anchor.
- `LienTriple` draws a three-segment L or a straight line depending on distance and angle.
- `LienCompositionProbleme` draws a double-bar decomposition symbol plus lines.

The link type depends on parent element type (`ElementParent.creerLienAdequat`):
- `Probleme` and `Procedure` → `LienCompositionProbleme`.
- `StructureIterative*` → `LienTriple`.
- `Condition` → `LienDroit` for first child, `LienTriple` for additional children.
- All others → `Lien` fallback (no concrete drawing).

**PlanTravail (Workspace)**
`PlanTravail` (`src/front-editeur/src/PartieEditeur/PlanTravail.js`) is the canvas for elements.
Key behaviors:
- `ajouterElement(elementClass, x, y, estEnVW)` converts px → vw, adjusts for scroll and zoom, then centers the element on the click point.
- `chargerDepuisJSON(corpsJSON)` creates elements by `typeElement` string and reconnects their children via `ElementParent.lierEnfant`.
- `exporterEnJSON()` produces an array of top-level elements with nested `enfants`, plus a `DictionnaireDonnee` object appended at the end.
- `updateAllLines()` recalculates link positions by calling `updateAll()` on parent links.
- `getCoordMinEtMax()` computes bounding coordinates for export sizing and scroll reference.

**SousPlanTravail (Decomposition View)**
`SousPlanTravail` (`src/front-editeur/src/PartieEditeur/SousPlanTravail.js`) is a sub-workspace tied to a `Probleme`:
- Open/close toggles a separate overlay plan.
- On open, selection overlays are moved into the subplan, and a breadcrumb subtitle is appended to the main title.
- `getRelativeChildrenToTop()` converts subplan coordinates back to the parent’s coordinate space for JSON export.
- `Probleme.decomposerAutrePlan()` creates and populates a subplan, then removes the subtree from the main plan.
- `Probleme` can “décomposer ici” to merge subplan children back into the main plan.

**Tool System**
Tools are indexed in `_typesElements` and linked to toolbar icons:
- Index `-1` = pointer (no creation).
- Index `0` = link tool.
- Indices `1..n` map to element classes in `_typesElements`.
- `selectTool()` updates the cursor icon, toggles CSS class `selected`, and handles link tool state (`pointePourLien`).

**Selection And Dragging**
Selection is modeled as a separate custom element:
- `Selection` stores a list of `RepresentationSelectionSimple` overlays.
- `SelectionRectangle` is a rubber-band rectangle; `listerElementsGraphiques()` selects elements by their `selectAnchor` inside the rectangle.
- Dragging:
- On `mousedown`, if selection exists, the editor creates an `EvenementDeplacementElementMultiples` that tracks old positions.
- On `mousemove`, it converts delta px → vw and calls `Selection.moveAllSelectedElements`.
- On `mouseup`, it commits the event if any element moved, and clears drag state.

**Linking Workflow (Link Tool)**
When the link tool is active:
- First click on a decomposable element sets `_pointePrecedementLien` and adds CSS class `pointePourLien`.
- Second click chooses parent/child based on Y position: smaller `_ordonnee` becomes parent.
- If the child is a `Condition`, it is replaced with its owning structure.
- The actual link is created via `ElementParent.lierEnfant`.

**Context Menu**
Right-click (`contextmenu`) attaches a `MenuContextuel`:
- Options vary by selection size and target type.
- Includes add element, copy/cut/paste, delete, unlink, and element-specific actions.
- For library items, it can delete custom library entries.

**Clipboard Flow**
`Editeur.copy()`:
- Uses `toJSONspecifier` to capture selected elements without duplicating nested selections.
- Normalizes coordinates to be relative to the selection center.
- Writes JSON to the clipboard via `navigator.clipboard.writeText()`.

`Editeur.paste()`:
- Reads JSON via `readFromClipboard()` and offsets elements by current mouse position.
- Calls `chargerDepuisJSON()` to instantiate.

Note: `readFromClipboard()` is referenced but not defined in this repo. It may be injected by an Electron wrapper or an external script. If you change paste behavior, search for this function in your environment.

**Undo/Redo System**
Undo/redo is event-driven:
- `_pileAnnuler` and `_pileRétablir` store `EvenementEdition` instances.
- Each event knows how to `annuler()` and `retablir()`.
- `EvenementComposite` groups multiple events, and `EvenementPlaceholder` is used as a temporary marker when loading JSON.
- Editing events include:
- Create/delete element
- Link/unlink
- Move element(s)
- Text edits for labels and switch expressions
- Iterative structure bounds edits

`Editeur.chargerDepuisJSON()`:
- Drops a `EvenementPlaceholder`, loads elements (which emit creation events), then replaces all those with a single `EvenementComposite` for undo.

**Export Pipeline**
Exports are all driven from `Editeur`:
- JSON export: downloads `PlanTravail.exporterEnJSON()` as a file.
- SVG export: builds a temporary `PlanTravail`, injects inline CSS, and serializes with `XMLSerializer`. It wraps the result in a `<svg><foreignObject>` container.
- PNG/JPG export: calls `exporterSVG`, draws it to `canvasExport` at `renderScale`, then downloads a data URL.
- Dictionary export: `DictionnaireDonnee.exporter("csv")` and `exporter("md")`.

Important: `exporterSVG()` embeds a **static** CSS string. If you add new visual elements, you must extend this CSS in `Editeur.exporterSVG()` or exports will be missing styling.

**Cloud Save/Load (AlgoForge Cloud)**
Enabled when URL hash looks like `#/id`:
- `loadAlgoFromURL()` GETs `/api/algos/:id` with `authToken` from cookies.
- `saveAlgoToCloud()` PUTs the current JSON and title.
- A `MutationObserver` watches the plan and toggles `#pingSauvegardeCloud` when unsaved changes exist.
- The save button (`#sauvegardeCloud`) is only shown in cloud mode.

**Dictionary Of Data**
`DictionnaireDonnee` (`src/front-editeur/src/PartieEditeur/DictionnaireDonnee.js`):
- Builds a full UI table for variables, types, and meanings.
- Maintains `_mesInformations` plus `types` and `signification` maps for export.
- `PlanTravail.effectuerDictionnaireDesDonnee()` scans all elements and rebuilds the dictionary.
- Renaming a variable updates all active plans via `plan.renameInformation()`.
- Export to CSV or Markdown is handled directly within the class.

**Algorithm Library**
`Bibliotheque` (`src/front-editeur/src/PartieEditeur/Bilbiotheque.js`):
- Fetches structured categories from `Bibliotheque/getStructure`.
- Stores custom algorithms in the `elementsPersonnalises` cookie.
- Search filters categories and highlights matches.

`InviteNouvelleBibliotheque`:
- Previews a JSON algorithm using a scaled `PlanTravail`.
- Sanitizes description with `sanitizeHTML`.
- Adds custom entries via `Bibliotheque.ajouterAlgorithmeCustom()`.

**Theme System**
`ThemeEditeur` (`src/front-editeur/src/PartieEditeur/ThemeEditeur.js`):
- Each theme is a custom `<option>` element.
- Applies a large set of CSS variables (colors, fonts, glow).
- Rewrites SVG asset URLs in CSS rules to colorize icons (`assetsDynamiques`).
- Updates icons for dictionary and library buttons.

**Zoom And Rendering**
`IndicateurZoom`:
- Updates `--sizeModifier` and displays zoom percentage.
- Uses cookies to persist zoom between sessions.
- Used by selection, export sizing, and coordinate transforms.

**Error/Warning Detection**
`PartieErreur` defines many warnings and errors. The flow is:
- `PlanTravail.rechercherAnomalies()` asks the plan and top-level elements to detect anomalies.
- Each element type has a `rechercherAnomalies()` method to attach specific errors.
- `AffichageErreur` toggles the UI and lets users browse detected anomalies.

**Modals**
`FenetreModale` is a generic modal wrapper. It loads HTML from `src/front-editeur/src/modales/*.html` and adds close and overlay behavior.

**Printing**
`Editeur` listens for `window.onbeforeprint` and `window.onafterprint`:
- Forces `--sizeModifier` to `1` during printing.
- Restores previous zoom after print.

**Adding A New Element (Checklist)**
When you add a new visual element class, you must update multiple places:
1. Create a new class in `src/front-editeur/src/PartieEditeur/` extending `ElementGraphique`.
2. Implement `afficher()`, `getTailleAbscisse()`, `getTailleOrdonnee()`, and anchors if it participates in linking.
3. Implement `toJSON()` and `toJSONspecifier()`.
4. Add instantiation logic to `PlanTravail.chargerDepuisJSON()`.
5. Register the class in `Editeur._typesElements` and add a toolbar icon in `index.html`.
6. Add a script tag in `index.html` in the correct order.
7. Add CSS in `style.css` and export CSS in `Editeur.exporterSVG()`.
8. If the element affects dictionary or errors, update `extraireInformation()` and `rechercherAnomalies()`.

**Known Quirks And Assumptions**
- Clipboard paste relies on `readFromClipboard()` which is not defined in this repo.
- All coordinate conversions are width-based (`window.innerWidth`), even for Y. This is consistent but non-intuitive.
- Exports rely on hardcoded CSS strings in `Editeur.exporterSVG()`.
- The library file name is `Bilbiotheque.js` (misspelled), but referenced consistently.

**If You Need To Trace Behavior**
Start from these functions:
- `Editeur` constructor for wiring.
- `Editeur.selectTool()`, `Editeur.copy()`, `Editeur.paste()` for main UX.
- `PlanTravail.ajouterElement()` and `PlanTravail.chargerDepuisJSON()` for element creation.
- `ElementParent.lierEnfant()` for linking logic.
- `Probleme.decomposerAutrePlan()` and `SousPlanTravail.ouvrir()` for decomposition.
- `Editeur.exporterSVG()` and `Editeur.createBitmapImageFromSvg()` for export.
