import { useState } from "react";
import { router } from "@inertiajs/react";
import InstanceAdminPanel from "@/Layouts/instance/InstanceAdminPanel";
import ProductVariantsForm from "@/Components/ui/ProductVariantsForm";
import ProductTagsCategories from "@/Components/ui/ProductTagscategories";

// ── Pill badge ──────────────────────────────────────────────────────────────
const Badge = ({ children, color = "gray" }) => {
  const colors = {
    gray: "bg-gray-100 text-gray-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-emerald-50 text-emerald-600",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

// ── Section card ────────────────────────────────────────────────────────────
const Card = ({ title, subtitle, icon, children }) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
    {title && (
      <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
        {icon && (
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 text-orange-500">
            {icon}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-gray-800">{title}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

// ── Field wrapper ───────────────────────────────────────────────────────────
const Field = ({ label, required, error, hint, children }) => (
  <div className="space-y-1.5">
    {label && (
      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
        {required && <span className="text-orange-500 ml-0.5">*</span>}
      </label>
    )}
    {children}
    {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    {error && <p className="text-xs text-red-500 flex items-center gap-1">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {error}
    </p>}
  </div>
);

// ── Input ───────────────────────────────────────────────────────────────────
const inputCls = (err) =>
  `w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 placeholder-gray-400 text-gray-800
   focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white focus:border-orange-400
   transition-all duration-150
   ${err ? "border-red-300 bg-red-50 focus:ring-red-400 focus:border-red-400" : "border-gray-200 hover:border-gray-300"}`;

// ── Select ──────────────────────────────────────────────────────────────────
const selectCls = (err) =>
  `w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 text-gray-800 appearance-none
   focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white focus:border-orange-400
   transition-all duration-150 cursor-pointer
   ${err ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"}`;

// ── Select with chevron ─────────────────────────────────────────────────────
const Select = ({ error, children, ...props }) => (
  <div className="relative">
    <select className={selectCls(error)} {...props}>{children}</select>
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

// ── Toggle ──────────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange, label, description }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <div className="relative mt-0.5">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <div className={`w-10 h-5 rounded-full transition-colors duration-200 ${checked ? "bg-orange-500" : "bg-gray-200 group-hover:bg-gray-300"}`} />
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : ""}`} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </div>
  </label>
);

// ── Icons ───────────────────────────────────────────────────────────────────
const Icons = {
  info: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  image: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  tag: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
  package: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  seo: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  plus: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  trash: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
};

// ══════════════════════════════════════════════════════════════════════════════
export default function Create({ categories = [], stores = [] }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    compare_price: "",
    sku: "",
    stock: "",
    type: "simple",
    status: "draft",
    category_id: "",
    store_id: "",
    images: [""],
    tags: [],
    brand_id: "",
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    seo: { meta_title: "", meta_description: "", slug: "" },
    is_featured: false,
    variants: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Le nom est obligatoire";
    if (!form.price) e.price = "Le prix est obligatoire";
    if (!form.category_id) e.category_id = "La catégorie est obligatoire";
    if (!form.images.length || !form.images[0]?.trim()) e.images = "Au moins une image est recommandée";
    if (!form.status) e.status = "Le statut est obligatoire";
    if (!form.type) e.type = "Le type est obligatoire";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    router.post("/admin/instance/products", form, {
      onError: (err) => { setErrors(err); setLoading(false); },
      onFinish: () => setLoading(false),
    });
  };

  const removeImage = (idx) => {
    const imgs = form.images.filter((_, i) => i !== idx);
    update("images", imgs.length ? imgs : [""]);
  };

  return (
    <div className="min-h-screen bg-gray-50/70">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── Page header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.visit("/admin/instance/products")}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Nouveau produit</h1>
              <p className="text-sm text-gray-400 mt-0.5">Remplissez les informations pour créer votre produit</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge color={form.status === "published" ? "green" : "gray"}>
              {form.status === "published" ? "Publié" : "Brouillon"}
            </Badge>
            <Badge color={form.type === "variable" ? "orange" : "gray"}>
              {form.type === "simple" ? "Simple" : "Variable"}
            </Badge>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left column (main) ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* General info */}
              <Card title="Informations générales" icon={Icons.info}>
                <div className="space-y-5">
                  <Field label="Nom du produit" required error={errors.name}>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Ex: Chaise de bureau ergonomique"
                      className={inputCls(errors.name)}
                    />
                  </Field>

                  <Field label="Description">
                    <textarea
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Décrivez votre produit en détail..."
                      rows={4}
                      className={inputCls(false)}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Prix (MAD)" required error={errors.price}>
                      <div className="relative">
                        <input
                          type="number"
                          value={form.price}
                          onChange={(e) => update("price", e.target.value)}
                          placeholder="0.00"
                          min="0" step="0.01"
                          className={`${inputCls(errors.price)} pr-12`}
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">MAD</span>
                      </div>
                    </Field>
                    <Field label="Prix barré" hint="Optionnel — prix avant remise">
                      <div className="relative">
                        <input
                          type="number"
                          value={form.compare_price}
                          onChange={(e) => update("compare_price", e.target.value)}
                          placeholder="0.00"
                          min="0" step="0.01"
                          className={`${inputCls(false)} pr-12`}
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">MAD</span>
                      </div>
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="SKU / Référence">
                      <input
                        type="text"
                        value={form.sku}
                        onChange={(e) => update("sku", e.target.value)}
                        placeholder="PROD-001"
                        className={inputCls(false)}
                      />
                    </Field>
                    <Field label="Stock disponible">
                      <input
                        type="number"
                        value={form.stock}
                        onChange={(e) => update("stock", e.target.value)}
                        placeholder="0"
                        min="0"
                        className={inputCls(false)}
                      />
                    </Field>
                  </div>
                </div>
              </Card>

              {/* ── Images Card — YouCan style ── */}
<Card
  title="Images"
  customHeader={
    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setImagesOpen(!imagesOpen)}
          className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className={`w-4 h-4 transition-transform duration-200 ${imagesOpen ? "" : "-rotate-90"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-800">Images</span>
      </div>
      <div className="flex items-center gap-2">
        {/* Générer */}
        <button
          type="button"
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
          </svg>
          Générer
        </button>
        {/* Télécharger */}
        <label className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white rounded-lg cursor-pointer transition-all active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #c0166a 0%, #a0145a 100%)" }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Télécharger des images
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
        </label>
        {/* Vidéo */}
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white rounded-lg transition-all active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #c0166a 0%, #a0145a 100%)" }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Ajouter un lien vidéo
        </button>
      </div>
    </div>
  }
>
  {/* Info banner */}
  <div className="flex items-start gap-3 px-4 py-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl text-sm text-blue-700">
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
    <span>Remarque: pour une meilleure apparence visuelle, utilisez l'image du produit avec une taille de <strong>800×800</strong></span>
  </div>

  {/* Drop zone + previews */}
  {form.images.filter(Boolean).length > 0 ? (
    <div className="mt-4 grid grid-cols-4 gap-3">
      {form.images.filter(Boolean).map((url, idx) => (
        <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square bg-gray-50">
          <img src={url} alt="" className="w-full h-full object-cover" />
          {idx === 0 && (
            <span className="absolute top-1.5 left-1.5 px-2 py-0.5 text-[10px] font-bold text-white rounded-md"
              style={{ background: "linear-gradient(135deg, #c0166a, #a0145a)" }}>
              Principale
            </span>
          )}
          <button
            type="button"
            onClick={() => removeImage(idx)}
            className="absolute top-1.5 right-1.5 flex items-center justify-center w-6 h-6 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      {/* Add more tile */}
      <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 aspect-square cursor-pointer hover:border-pink-300 hover:bg-pink-50/40 transition-all group">
        <svg className="w-6 h-6 text-gray-300 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-xs text-gray-400 group-hover:text-pink-500 mt-1 font-medium">Ajouter</span>
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
      </label>
    </div>
  ) : (
    /* Empty drop zone */
    <label className="mt-4 flex flex-col items-center justify-center w-full py-10 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-pink-300 hover:bg-pink-50/30 transition-all group">
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-pink-100 transition-colors mb-3">
        <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-600 group-hover:text-pink-600 transition-colors">Glissez vos images ici</p>
      <p className="text-xs text-gray-400 mt-1">ou cliquez pour sélectionner — PNG, JPG, WEBP</p>
      <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
    </label>
  )}

  {errors.images && (
    <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {errors.images}
    </p>
  )}
</Card>

              {/* Variants */}
              {form.type === "variable" && (
                <ProductVariantsForm
                  variants={form.variants}
                  onChange={(variants) => update("variants", variants)}
                />
              )}

              {/* Tags & Categories */}
              <ProductTagsCategories
                tags={form.tags}
                category_id={form.category_id}
                categories={categories}
                onTagsChange={(tags) => update("tags", tags)}
                onCategoryChange={(id) => update("category_id", id)}
              />

              {/* SEO */}
              <Card title="Référencement (SEO)" subtitle="Optimisez votre visibilité" icon={Icons.seo}>
                <div className="space-y-4">
                  <Field label="Meta title">
                    <input
                      type="text"
                      value={form.seo.meta_title}
                      onChange={(e) => update("seo", { ...form.seo, meta_title: e.target.value })}
                      placeholder="Titre pour les moteurs de recherche"
                      className={inputCls(false)}
                    />
                  </Field>
                  <Field label="Meta description">
                    <textarea
                      value={form.seo.meta_description}
                      onChange={(e) => update("seo", { ...form.seo, meta_description: e.target.value })}
                      placeholder="Description courte pour les résultats Google..."
                      rows={2}
                      className={inputCls(false)}
                    />
                  </Field>
                  <Field label="Slug URL" hint="Laissez vide pour générer automatiquement">
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">/products/</span>
                      <input
                        type="text"
                        value={form.seo.slug}
                        onChange={(e) => update("seo", { ...form.seo, slug: e.target.value })}
                        placeholder="mon-produit"
                        className={`${inputCls(false)} pl-24`}
                      />
                    </div>
                  </Field>
                </div>
              </Card>

            </div>

            {/* ── Right column (sidebar) ── */}
            <div className="space-y-6">

              {/* Status & Type */}
              <Card title="Publication" icon={Icons.tag}>
                <div className="space-y-4">
                  <Field label="Statut" error={errors.status}>
                    <Select value={form.status} onChange={(e) => update("status", e.target.value)} error={errors.status}>
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                    </Select>
                  </Field>
                  <Field label="Type de produit" error={errors.type}>
                    <Select value={form.type} onChange={(e) => update("type", e.target.value)} error={errors.type}>
                      <option value="simple">Simple</option>
                      <option value="variable">Variable</option>
                    </Select>
                  </Field>
                  <div className="pt-1">
                    <Toggle
                      checked={form.is_featured}
                      onChange={(e) => update("is_featured", e.target.checked)}
                      label="Produit en vedette"
                      description="Afficher dans les sections mises en avant"
                    />
                  </div>
                </div>
              </Card>

              {/* Organisation */}
              <Card title="Organisation" icon={Icons.tag}>
                <div className="space-y-4">
                  <Field label="Catégorie" required error={errors.category_id}>
                    <Select value={form.category_id} onChange={(e) => update("category_id", e.target.value)} error={errors.category_id}>
                      <option value="">-- Sélectionner --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Store / Tenant">
                    <Select value={form.store_id} onChange={(e) => update("store_id", e.target.value)}>
                      <option value="">-- Sélectionner --</option>
                      {stores.map((store) => (
                        <option key={store.id} value={store.id}>{store.name}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Marque">
                    <input
                      type="text"
                      value={form.brand_id}
                      onChange={(e) => update("brand_id", e.target.value)}
                      placeholder="Nom ou ID de la marque"
                      className={inputCls(false)}
                    />
                  </Field>
                </div>
              </Card>

              {/* Shipping */}
              <Card title="Livraison" subtitle="Poids & dimensions" icon={Icons.package}>
                <div className="space-y-4">
                  <Field label="Poids">
                    <div className="relative">
                      <input
                        type="number"
                        value={form.weight}
                        onChange={(e) => update("weight", e.target.value)}
                        placeholder="0.00"
                        min="0" step="0.01"
                        className={`${inputCls(false)} pr-10`}
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">kg</span>
                    </div>
                  </Field>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Dimensions (cm)</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Long.", key: "length" },
                        { label: "Larg.", key: "width" },
                        { label: "Haut.", key: "height" },
                      ].map(({ label, key }) => (
                        <div key={key}>
                          <p className="text-xs text-gray-400 mb-1">{label}</p>
                          <input
                            type="number"
                            value={form.dimensions[key]}
                            onChange={(e) => update("dimensions", { ...form.dimensions, [key]: e.target.value })}
                            placeholder="0"
                            min="0"
                            className={inputCls(false)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Actions sticky */}
              <div className="sticky bottom-6 space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 text-white text-sm font-semibold rounded-xl
                    hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-150 shadow-md shadow-orange-200"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Créer le produit
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.visit("/admin/instance/products")}
                  className="w-full px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl
                    hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition-all duration-150"
                >
                  Annuler
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

Create.layout = (page) => <InstanceAdminPanel children={page} />;