import { useState } from "react";

export default function ProductTagsCategories({
  tags = [],
  category_id = "",
  categories = [],
  onTagsChange,
  onCategoryChange,
}) {
  const [tagInput, setTagInput] = useState("");

  // ── Ajouter un tag ──
  const addTag = (value) => {
    const tag = value.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
    setTagInput("");
  };

  // ── Supprimer un tag ──
  const removeTag = (tag) => {
    onTagsChange(tags.filter((t) => t !== tag));
  };

  // ── Clavier : Entrée ou virgule = ajouter ──
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const SUGGESTED_TAGS = ["nouveau", "promo", "bestseller", "bio", "premium", "solde", "exclusif"];
  const availableSuggestions = SUGGESTED_TAGS.filter((t) => !tags.includes(t));

  return (
    <section className="bg-white rounded-xl shadow p-6 space-y-5">
      <h2 className="font-semibold text-gray-700">Tags &amp; Catégories</h2>

      {/* ── Catégorie (SCRUM-89) ── */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Catégorie *
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={category_id}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Sélectionner une catégorie...</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* ── Tags (SCRUM-89) ── */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Tags du produit
        </label>

        {/* Zone de saisie des tags */}
        <div
          className="flex flex-wrap gap-2 border border-gray-300 rounded-lg px-3 py-2 min-h-[48px] cursor-text focus-within:ring-2 focus-within:ring-orange-400"
          onClick={() => document.getElementById("tag-input").focus()}
        >
          {/* Tags existants */}
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-md"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-orange-400 hover:text-orange-700 leading-none"
              >
                ✕
              </button>
            </span>
          ))}

          {/* Input */}
          <input
            id="tag-input"
            type="text"
            className="flex-1 min-w-[120px] text-sm outline-none border-none bg-transparent"
            placeholder={tags.length === 0 ? "Tapez un tag puis Entrée..." : ""}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => tagInput && addTag(tagInput)}
          />
        </div>

        <p className="text-xs text-gray-400 mt-1">
          Appuyez sur <kbd className="bg-gray-100 px-1 rounded">Entrée</kbd> ou{" "}
          <kbd className="bg-gray-100 px-1 rounded">,</kbd> pour ajouter un tag
        </p>
      </div>

      {/* ── Suggestions rapides ── */}
      {availableSuggestions.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 mb-2">Suggestions :</p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onTagsChange([...tags, tag])}
                className="text-xs border border-dashed border-orange-300 text-orange-500 px-2 py-1 rounded-md hover:bg-orange-50 transition"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Résumé payload (ce qui part au backend) ── */}
      {(tags.length > 0 || category_id) && (
        <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 font-mono">
          <p className="font-semibold text-gray-600 mb-1">Payload envoyé :</p>
          <p>category_id: <span className="text-orange-600">{category_id || "null"}</span></p>
          <p>tags: <span className="text-orange-600">[{tags.map(t => `"${t}"`).join(", ")}]</span></p>
        </div>
      )}
    </section>
  );
}