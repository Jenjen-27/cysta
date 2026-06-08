import { useState } from "react";

const C = {
  primary: "#C2607A", primaryDark: "#8B3050", primaryLight: "#FCEEF2", primaryBorder: "#E8A0B4",
  accent: "#D4956A", accentDark: "#8B5A35", accentLight: "#FDF6EC", accentBorder: "#E8C4A0",
  text: "#2C2C2A", textMuted: "#7A6A6E", textFaint: "#B09AA0",
  bg: "#FFFFFF", bgSoft: "#FDF8F9", border: "#EDD8DF",
  warn: "#A32D2D", warnLight: "#FCEBEB", warnBorder: "#F09595",
  success: "#5A8F6E", successLight: "#EAF3DE",
};

const RECIPE_DETAILS = {
  r1: { ingredients:["80g rolled oats","200ml water or oat milk","80g frozen berries","1 tsp honey (optional)","Pinch of cinnamon"], steps:["Bring water or oat milk to a boil in a small pot.","Add oats, reduce heat. Stir for 3–4 minutes until creamy.","Pour into a bowl. Top with frozen berries — they thaw quickly.","Add cinnamon and honey if you like."], tip:"Cinnamon helps with blood sugar balance — great for PCOS! Use certified GF oats if avoiding gluten.", time:"10 min", serves:"1" },
  r2: { ingredients:["2 large eggs","Large handful of spinach","½ small onion, sliced","1 tsp olive oil","Salt & pepper"], steps:["Heat olive oil in a pan over medium heat.","Add onion and cook 2–3 minutes until soft.","Add spinach and stir until wilted, about 1 minute.","Beat eggs, pour over veg. Stir gently until just set.","Season with salt and pepper."], tip:"Eggs give you protein and healthy fats — keeps blood sugar stable all morning.", time:"10 min", serves:"1" },
  r3: { ingredients:["200g cooked green lentils","1 carrot, diced","1 small onion, diced","2 tbsp olive oil","1 tbsp lemon juice","Salt, pepper, cumin"], steps:["Heat olive oil. Add onion and carrot, cook 5–7 minutes until soft.","Add lentils and stir. Cook 2–3 minutes until warm.","Season with cumin, salt, pepper and lemon juice.","Serve warm on its own or over greens."], tip:"Lentils are one of the best foods for PCOS — high fibre, low GI, and full of iron.", time:"20 min", serves:"2" },
  r4: { ingredients:["1 tin tuna in water, drained","½ cucumber, sliced","Juice of ½ lemon","1 tbsp olive oil","Salt & pepper","Fresh parsley (optional)"], steps:["Drain tuna and flake into a bowl.","Add cucumber, lemon juice and olive oil.","Mix gently and season to taste.","Top with parsley if you have it."], tip:"Ready in 5 minutes — perfect for a bad day. Tuna is rich in omega-3 which helps reduce PCOS inflammation.", time:"5 min", serves:"1" },
  r5: { ingredients:["2 chicken breasts","1 lemon, zested and juiced","3 garlic cloves, minced","2 tbsp olive oil","Salt, pepper, dried thyme"], steps:["Preheat oven to 200°C.","Mix lemon juice, zest, garlic, olive oil and thyme.","Place chicken in a baking dish and pour marinade over.","Bake 20–25 minutes until cooked through.","Rest 5 minutes before serving."], tip:"Serve with roasted vegetables or a simple salad for a complete anti-inflammatory meal.", time:"25 min", serves:"2" },
  r6: { ingredients:["3 eggs","1 tin chopped tomatoes","2 garlic cloves, minced","1 tsp olive oil","Salt, pepper, paprika","Fresh basil (optional)"], steps:["Heat olive oil in an oven-safe pan. Add garlic, cook 1 minute.","Add tomatoes, season with salt, pepper and paprika. Simmer 5 minutes.","Make wells in the sauce and crack in the eggs.","Cover and cook 5–7 minutes until whites are set."], tip:"Also called shakshuka! Tomatoes are rich in lycopene which supports hormone health.", time:"20 min", serves:"2" },
  r7: { ingredients:["2 chicken thighs or breasts","2 carrots, sliced","2 celery stalks, sliced","1 onion, diced","1L chicken or vegetable broth","Salt, pepper, bay leaf"], steps:["Add all ingredients to a pot. Bring to a boil.","Reduce heat and simmer 25 minutes.","Remove chicken, shred with forks, return to pot.","Taste and adjust seasoning. Remove bay leaf."], tip:"Make a big batch — freezes well for bad days when you don't want to cook.", time:"30 min", serves:"3–4" },
  r8: { ingredients:["2 eggs","1 large carrot, cut into sticks","½ cucumber, cut into sticks","Pinch of salt"], steps:["Place eggs in cold water. Bring to a boil.","Cook 7–8 minutes for a firm yolk.","Transfer to cold water to cool, then peel.","Serve with carrot and cucumber sticks."], tip:"Pack this as a snack — travels well and keeps you full for hours.", time:"5 min", serves:"1" },
  r9: { ingredients:["1 banana","2 tbsp peanut butter (or sunflower butter)"], steps:["Slice banana or keep whole.","Serve with peanut butter for dipping or spread on top."], tip:"Swap peanut butter for sunflower seed butter if you have a nut allergy. The combo of banana + fat keeps blood sugar steady.", time:"2 min", serves:"1" },
  r10: { ingredients:["1 medium sweet potato, diced","2 eggs","½ tsp paprika","1 tbsp olive oil","Salt & pepper","Fresh chives (optional)"], steps:["Heat olive oil. Add sweet potato, cook 12–15 minutes until golden.","Season with paprika, salt and pepper.","Make two wells and crack in the eggs.","Cover and cook 3–4 minutes until whites are set."], tip:"Sweet potato is one of the best evening carbs for PCOS — slow-releasing and soothing.", time:"25 min", serves:"1" },
};

const RECIPES = [
  { id:"r1", emoji:"🥣", name:"Oat porridge with berries", meta:"10 min · oats, frozen berries", cat:"breakfast", badge:"Low GI", badgeType:"accent", allergens:["Gluten"] },
  { id:"r2", emoji:"🥚", name:"Egg & spinach scramble", meta:"10 min · eggs, spinach, onion", cat:"breakfast", badge:"High protein", badgeType:"primary", allergens:["Eggs"] },
  { id:"r3", emoji:"🥗", name:"Warm lentil salad", meta:"20 min · lentils, carrot, onion", cat:"lunch", badge:"Anti-inflammatory", badgeType:"primary", allergens:[] },
  { id:"r4", emoji:"🐟", name:"Tuna & cucumber salad", meta:"5 min · tinned tuna, cucumber, lemon", cat:"lunch", badge:"High protein", badgeType:"primary", allergens:["Fish"] },
  { id:"r5", emoji:"🍗", name:"Simple lemon chicken", meta:"25 min · chicken, lemon, garlic", cat:"dinner", badge:"Low GI", badgeType:"accent", allergens:[] },
  { id:"r6", emoji:"🍳", name:"Greek-style baked eggs", meta:"20 min · eggs, tinned tomatoes, garlic", cat:"dinner", badge:"Anti-inflammatory", badgeType:"primary", allergens:["Eggs"] },
  { id:"r7", emoji:"🍲", name:"Chicken & vegetable soup", meta:"30 min · chicken, carrot, celery, onion", cat:"dinner", badge:"Hormone support", badgeType:"soft", allergens:[] },
  { id:"r8", emoji:"🥕", name:"Boiled eggs & veggie sticks", meta:"5 min · eggs, carrot, cucumber", cat:"snack", badge:"High protein", badgeType:"primary", allergens:["Eggs"] },
  { id:"r9", emoji:"🍌", name:"Banana & nut butter", meta:"2 min · banana, peanut butter", cat:"snack", badge:"Low GI", badgeType:"accent", allergens:["Peanuts"] },
  { id:"r10", emoji:"🍠", name:"Sweet potato & egg hash", meta:"25 min · sweet potato, egg, paprika", cat:"evening", badge:"Low GI", badgeType:"accent", allergens:["Eggs"] },
];

const FRIDGE_ITEMS = [
  {name:"Eggs",status:"ok"},{name:"Chicken breast",status:"ok"},{name:"Spinach",status:"ok"},
  {name:"Carrots",status:"ok"},{name:"Lentils",status:"ok"},{name:"Sweet potato",status:"low"},
  {name:"Frozen berries",status:"low"},{name:"Oats",status:"ok"},{name:"Tinned tomatoes",status:"ok"},
  {name:"Tinned tuna",status:"low"},{name:"Lemon",status:"ok"},{name:"Garlic",status:"ok"},
];

const SYMPTOMS = ["Tired","Low mood","Bloated","Brain fog","Cravings","Anxious","Headache","Cramps"];
const ALLERGENS_LIST = ["Gluten","Dairy","Eggs","Fish","Soy","Nuts","Peanuts","Sesame"];

const STORE_SECTIONS = {
  "Produce": ["spinach","carrot","carrots","cucumber","onion","garlic","lemon","banana","sweet potato","celery","parsley","chives","basil"],
  "Meat & Fish": ["eggs","egg","chicken","tuna","chicken breast","chicken thighs"],
  "Dairy & Fridge": ["oat milk","milk"],
  "Dry & Canned": ["oats","lentils","tinned tomatoes","tinned tuna","peanut butter","sunflower butter","broth"],
  "Pantry": ["olive oil","honey","cinnamon","paprika","cumin","thyme","salt","pepper","bay leaf"],
};

function categoriseItem(name) {
  const lower = name.toLowerCase();
  for (const [section, keywords] of Object.entries(STORE_SECTIONS)) {
    if (keywords.some(k => lower.includes(k))) return section;
  }
  return "Other";
}

const LOG_HISTORY = [
  {date:"Today",symptoms:["Tired","Bloated"]},{date:"Yesterday",symptoms:["Brain fog","Cravings"]},
  {date:"2 days ago",symptoms:["Low mood","Tired"]},{date:"3 days ago",symptoms:[]},{date:"4 days ago",symptoms:["Bloated"]},
];
const AFFIRMATIONS = [
  "Your body is working hard. You don't have to be perfect to feel better.",
  "Small steps still count. You're doing more than you think.",
  "Rest is productive. Your body heals when you listen to it.",
  "You are not your symptoms. You are so much more than PCOS.",
  "Today doesn't have to be perfect. It just has to be yours.",
];

// ── RECIPE DETAIL SCREEN ──────────────────────────────────────────────────────
function RecipeDetail({ recipe, favourites, toggleFav, hideRecipe, onBack, onAddToShop }) {
  const [checkedSteps, setCheckedSteps] = useState({});
  const [checkedIng, setCheckedIng] = useState({});
  const [addedToShop, setAddedToShop] = useState(false);
  const detail = RECIPE_DETAILS[recipe.id];
  const addToShoppingList = (ingredients) => {
    setShoppingList(prev => {
      const existing = prev.map(i => i.name.toLowerCase());
      const toAdd = ingredients
        .filter(ing => {
          const clean = ing.replace(/^[\d½¼¾tgmlLcupsbsptbsp\s]+/i,'').trim();
          return !existing.includes(clean.toLowerCase());
        })
        .map(ing => ({ name: ing, checked: false, id: Date.now() + Math.random() }));
      return [...prev, ...toAdd];
    });
  };
  const toggleShopItem = (id) => setShoppingList(p => p.map(i => i.id===id ? {...i, checked:!i.checked} : i));
  const removeShopItem = (id) => setShoppingList(p => p.filter(i => i.id!==id));
  const clearChecked = () => setShoppingList(p => p.filter(i => !i.checked));
  const addManualItem = () => {
    if (!newShopItem.trim()) return;
    setShoppingList(p => [...p, { name: newShopItem.trim(), checked: false, id: Date.now() }]);
    setNewShopItem("");
  };

  const ph = { fontFamily:"'Playfair Display', Georgia, serif" };
  const body = { fontFamily:"'DM Sans', system-ui, sans-serif" };
  const doneSteps = Object.values(checkedSteps).filter(Boolean).length;
  const progress = Math.round((doneSteps / detail.steps.length) * 100);

  return (
    <div style={{...body, background:"#F5EDEF", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px"}}>
      <div style={{width:"100%", maxWidth:"390px", background:C.bg, borderRadius:"24px", overflow:"hidden", boxShadow:"0 4px 32px rgba(194,96,122,0.12)", display:"flex", flexDirection:"column", minHeight:"680px"}}>
        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${C.primaryLight},${C.accentLight})`, padding:"20px 20px 16px", flexShrink:0}}>
          <div onClick={onBack} style={{fontSize:"13px", color:C.primary, cursor:"pointer", marginBottom:"16px", display:"flex", alignItems:"center", gap:"4px"}}>
            ← Back to recipes
          </div>
          <div style={{display:"flex", alignItems:"center", gap:"14px", marginBottom:"12px"}}>
            <div style={{fontSize:"44px"}}>{recipe.emoji}</div>
            <div>
              <div style={{...ph, fontSize:"20px", fontWeight:"600", color:C.text, lineHeight:"1.2"}}>{recipe.name}</div>
              <div style={{fontSize:"12px", color:C.textMuted, marginTop:"5px", display:"flex", gap:"12px"}}>
                <span>⏱ {detail.time}</span>
                <span>🍽 {detail.serves} serving{detail.serves!=="1"?"s":""}</span>
              </div>
            </div>
          </div>
          <div style={{display:"flex", gap:"6px", flexWrap:"wrap"}}>
            <span style={{fontSize:"10px", padding:"3px 9px", borderRadius:"20px", background:recipe.badgeType==="accent"?C.accentLight:C.primaryLight, color:recipe.badgeType==="accent"?C.accentDark:C.primaryDark}}>{recipe.badge}</span>
            {recipe.allergens.map(a=><span key={a} style={{fontSize:"10px", padding:"3px 9px", borderRadius:"20px", background:C.warnLight, color:C.warn, border:`0.5px solid ${C.warnBorder}`}}>⚠️ {a}</span>)}
            {recipe.allergens.length===0 && <span style={{fontSize:"10px", padding:"3px 9px", borderRadius:"20px", background:C.successLight, color:C.success}}>Allergen-free ✓</span>}
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{flex:1, overflowY:"auto", padding:"16px 20px"}}>
          {/* Ingredients */}
          <div style={{marginBottom:"22px"}}>
            <div style={{...ph, fontSize:"17px", fontWeight:"600", color:C.text, marginBottom:"12px"}}>Ingredients</div>
            {detail.ingredients.map((ing,i)=>(
              <div key={i} onClick={()=>setCheckedIng(p=>({...p,[i]:!p[i]}))} style={{display:"flex", alignItems:"center", gap:"10px", padding:"9px 0", borderBottom:`0.5px solid ${C.border}`, cursor:"pointer"}}>
                <div style={{width:"20px", height:"20px", borderRadius:"50%", border:`0.5px solid ${checkedIng[i]?C.primary:C.border}`, background:checkedIng[i]?C.primaryLight:C.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"11px", color:C.primary}}>
                  {checkedIng[i]?"✓":""}
                </div>
                <span style={{fontSize:"13px", color:checkedIng[i]?C.textFaint:C.text, textDecoration:checkedIng[i]?"line-through":"none"}}>{ing}</span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div style={{marginBottom:"22px"}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px"}}>
              <div style={{...ph, fontSize:"17px", fontWeight:"600", color:C.text}}>Steps</div>
              <div style={{fontSize:"11px", color:C.textMuted}}>{doneSteps}/{detail.steps.length} done</div>
            </div>
            {progress>0 && (
              <div style={{height:"3px", background:C.border, borderRadius:"2px", marginBottom:"12px"}}>
                <div style={{height:"100%", width:`${progress}%`, background:C.primary, borderRadius:"2px"}}/>
              </div>
            )}
            {detail.steps.map((step,i)=>(
              <div key={i} onClick={()=>setCheckedSteps(p=>({...p,[i]:!p[i]}))} style={{display:"flex", gap:"12px", padding:"12px", borderRadius:"12px", marginBottom:"8px", background:checkedSteps[i]?C.primaryLight:C.bgSoft, border:`0.5px solid ${checkedSteps[i]?C.primaryBorder:C.border}`, cursor:"pointer"}}>
                <div style={{width:"24px", height:"24px", borderRadius:"50%", background:checkedSteps[i]?C.primary:C.bg, border:`0.5px solid ${checkedSteps[i]?C.primary:C.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"11px", fontWeight:"500", color:checkedSteps[i]?"white":C.textMuted}}>
                  {checkedSteps[i]?"✓":i+1}
                </div>
                <span style={{fontSize:"13px", color:checkedSteps[i]?C.textFaint:C.text, lineHeight:"1.6", textDecoration:checkedSteps[i]?"line-through":"none"}}>{step}</span>
              </div>
            ))}
          </div>

          {/* PCOS tip */}
          <div style={{background:C.accentLight, border:`0.5px solid ${C.accentBorder}`, borderRadius:"12px", padding:"14px", marginBottom:"16px"}}>
            <div style={{fontSize:"11px", fontWeight:"500", color:C.accentDark, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"5px"}}>🌿 PCOS tip</div>
            <div style={{fontSize:"13px", color:C.accentDark, lineHeight:"1.6"}}>{detail.tip}</div>
          </div>

          {/* Shopping list button */}
          <button onClick={()=>{ onAddToShop(detail.ingredients); setAddedToShop(true); setTimeout(()=>setAddedToShop(false),2000); }} style={{width:"100%", padding:"12px", borderRadius:"12px", background:addedToShop?"#EAF3DE":C.accentLight, border:`0.5px solid ${addedToShop?"#5A8F6E":C.accentBorder}`, color:addedToShop?"#5A8F6E":C.accentDark, fontSize:"13px", cursor:"pointer", marginBottom:"8px", fontFamily:"'DM Sans', system-ui, sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px"}}>
            {addedToShop ? "✓ Added to shopping list!" : "🛒 Add ingredients to shopping list"}
          </button>

          {/* Actions */}
          <div style={{display:"flex", gap:"8px"}}>
            <button onClick={()=>toggleFav(recipe.id)} style={{flex:1, padding:"11px", borderRadius:"12px", border:`0.5px solid ${favourites.includes(recipe.id)?C.primaryBorder:C.border}`, background:favourites.includes(recipe.id)?C.primaryLight:C.bgSoft, color:favourites.includes(recipe.id)?C.primaryDark:C.textMuted, fontSize:"13px", cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif"}}>
              {favourites.includes(recipe.id)?"🩷 Saved":"🤍 Save recipe"}
            </button>
            <button onClick={()=>{hideRecipe(recipe.id); onBack();}} style={{padding:"11px 14px", borderRadius:"12px", border:`0.5px solid ${C.border}`, background:C.bgSoft, color:C.textFaint, fontSize:"13px", cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif"}}>
              Hide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function CystaApp() {
  const [screen, setScreen] = useState("onboarding");
  const [onboardStep, setOnboardStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [selectedAllergens, setSelectedAllergens] = useState(["Dairy"]);
  const [tab, setTab] = useState("home");
  const [mood, setMood] = useState("okay");
  const [symptoms, setSymptoms] = useState(["Tired","Bloated"]);
  const [affIdx, setAffIdx] = useState(0);
  const [favourites, setFavourites] = useState(["r2","r4"]);
  const [hiddenRecipes, setHiddenRecipes] = useState([]);
  const [recipeTab, setRecipeTab] = useState("all");
  const [recipeCat, setRecipeCat] = useState("all");
  const [undoId, setUndoId] = useState(null);
  const [fridgeItems, setFridgeItems] = useState(FRIDGE_ITEMS);
  const [showPremiumBanner, setShowPremiumBanner] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const [newShopItem, setNewShopItem] = useState("");

  const toggleAllergen = (a) => setSelectedAllergens(p=>p.includes(a)?p.filter(x=>x!==a):[...p,a]);
  const toggleSymptom = (s) => setSymptoms(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s]);
  const toggleFav = (id) => setFavourites(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const hideRecipe = (id) => { setHiddenRecipes(p=>[...p,id]); setUndoId(id); setTimeout(()=>setUndoId(null),4000); };
  const undoHide = () => { setHiddenRecipes(p=>p.filter(x=>x!==undoId)); setUndoId(null); };

  const addToShoppingList = (ingredients) => {
    setShoppingList(prev => {
      const existing = prev.map(i => i.name.toLowerCase());
      const toAdd = ingredients
        .filter(ing => {
          const clean = ing.replace(/^[\d½¼¾tgmlLcupsbsptbsp\s]+/i,'').trim();
          return !existing.includes(clean.toLowerCase());
        })
        .map(ing => ({ name: ing, checked: false, id: Date.now() + Math.random() }));
      return [...prev, ...toAdd];
    });
  };
  const toggleShopItem = (id) => setShoppingList(p => p.map(i => i.id===id ? {...i, checked:!i.checked} : i));
  const removeShopItem = (id) => setShoppingList(p => p.filter(i => i.id!==id));
  const clearChecked = () => setShoppingList(p => p.filter(i => !i.checked));
  const addManualItem = () => {
    if (!newShopItem.trim()) return;
    setShoppingList(p => [...p, { name: newShopItem.trim(), checked: false, id: Date.now() }]);
    setNewShopItem("");
  };

  const ph = { fontFamily:"'Playfair Display', Georgia, serif" };
  const body = { fontFamily:"'DM Sans', system-ui, sans-serif" };

  const cats = ["all","breakfast","lunch","dinner","snack","evening"];
  const visibleRecipes = RECIPES.filter(r=>!hiddenRecipes.includes(r.id));
  const filteredRecipes = visibleRecipes.filter(r=>{
    if (recipeTab==="fav") return favourites.includes(r.id);
    if (recipeCat!=="all") return r.cat===recipeCat;
    return true;
  });

  const RecipeCard = ({r}) => {
    const flagged = r.allergens.filter(a=>!selectedAllergens.includes(a));
    return (
      <div onClick={()=>setSelectedRecipe(r)} style={{border:`0.5px solid ${favourites.includes(r.id)?C.primary:C.border}`, borderRadius:"12px", padding:"11px 12px", marginBottom:"8px", background:C.bg, position:"relative", cursor:"pointer"}}>
        <div style={{display:"flex", gap:"10px", alignItems:"flex-start"}}>
          <div style={{width:"42px", height:"42px", background:C.primaryLight, borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0}}>{r.emoji}</div>
          <div style={{flex:1, minWidth:0, paddingRight:"60px"}}>
            <div style={{fontSize:"13px", fontWeight:"500", color:C.text}}>{r.name}</div>
            <div style={{fontSize:"11px", color:C.textMuted, marginTop:"2px"}}>{r.meta}</div>
            <div style={{display:"flex", gap:"5px", flexWrap:"wrap", marginTop:"5px"}}>
              <span style={{fontSize:"10px", padding:"2px 8px", borderRadius:"20px", background:r.badgeType==="accent"?C.accentLight:C.primaryLight, color:r.badgeType==="accent"?C.accentDark:C.primaryDark}}>{r.badge}</span>
              {flagged.map(a=><span key={a} style={{fontSize:"10px", padding:"2px 8px", borderRadius:"20px", background:C.warnLight, color:C.warn, border:`0.5px solid ${C.warnBorder}`}}>⚠️ {a}</span>)}
              {r.allergens.length===0&&<span style={{fontSize:"10px", padding:"2px 8px", borderRadius:"20px", background:C.bgSoft, color:C.textFaint, border:`0.5px solid ${C.border}`}}>Allergen-free</span>}
            </div>
          </div>
        </div>
        <div style={{position:"absolute", top:"10px", right:"10px", display:"flex", gap:"5px"}} onClick={e=>e.stopPropagation()}>
          <div onClick={()=>toggleFav(r.id)} style={{width:"28px", height:"28px", borderRadius:"8px", border:`0.5px solid ${favourites.includes(r.id)?C.primaryBorder:C.border}`, background:favourites.includes(r.id)?C.primaryLight:C.bgSoft, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:"14px"}}>
            {favourites.includes(r.id)?"🩷":"🤍"}
          </div>
          <div onClick={()=>hideRecipe(r.id)} style={{width:"28px", height:"28px", borderRadius:"8px", border:`0.5px solid ${C.border}`, background:C.bgSoft, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:"12px", color:C.textFaint}}>✕</div>
        </div>
      </div>
    );
  };

  // Show recipe detail
  if (selectedRecipe) return (
    <RecipeDetail
      recipe={selectedRecipe}
      favourites={favourites}
      toggleFav={toggleFav}
      hideRecipe={hideRecipe}
      onBack={()=>setSelectedRecipe(null)}
      onAddToShop={addToShoppingList}
    />
  );

  // ONBOARDING
  if (screen==="onboarding") return (
    <div style={{...body, background:C.bgSoft, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px"}}>
      <div style={{width:"100%", maxWidth:"390px", background:C.bg, borderRadius:"24px", overflow:"hidden", boxShadow:"0 4px 32px rgba(194,96,122,0.12)"}}>
        {onboardStep===1 && (
          <div>
            <div style={{background:`linear-gradient(160deg,${C.primaryLight} 0%,${C.accentLight} 100%)`, padding:"48px 32px 32px", textAlign:"center"}}>
              <div style={{...ph, fontSize:"30px", fontWeight:"700", color:C.primary, letterSpacing:"0.15em", marginBottom:"20px"}}>CYSTA</div>
              <div style={{...ph, fontSize:"26px", fontWeight:"600", color:C.text, lineHeight:"1.2", marginBottom:"12px"}}>Made for PCOS.<br/>Made for you.</div>
              <div style={{fontSize:"14px", color:C.textMuted, lineHeight:"1.7"}}>Recipes, symptom tracking, and gentle guidance — built around how PCOS actually feels.</div>
            </div>
            <div style={{padding:"24px"}}>
              <div style={{background:`linear-gradient(135deg,${C.primaryLight},${C.accentLight})`, borderRadius:"16px", padding:"20px", marginBottom:"20px", border:`0.5px solid ${C.primaryBorder}`}}>
                <div style={{...ph, fontSize:"16px", fontWeight:"600", color:C.primaryDark, marginBottom:"12px"}}>Start your free month 🌸</div>
                {["Unlimited PCOS-friendly recipes","Personal allergen filtering","Symptom tracking & pattern insights","Bad day mode — comfort meals in 1 tap"].map(f=>(
                  <div key={f} style={{display:"flex", alignItems:"center", gap:"8px", fontSize:"13px", color:C.primary, marginBottom:"7px"}}>
                    <span style={{color:C.success}}>✓</span>{f}
                  </div>
                ))}
                <div style={{fontSize:"11px", color:C.textFaint, marginTop:"12px"}}>Then ~20 kr/month. Cancel anytime.</div>
              </div>
              <button onClick={()=>setOnboardStep(2)} style={{width:"100%", padding:"14px", borderRadius:"12px", background:C.primary, color:"white", border:"none", fontSize:"15px", fontWeight:"500", cursor:"pointer", ...body}}>Start free trial</button>
              <button onClick={()=>setOnboardStep(2)} style={{width:"100%", padding:"10px", background:"none", border:"none", fontSize:"13px", color:C.textFaint, cursor:"pointer", marginTop:"8px", ...body}}>Continue with free version</button>
            </div>
          </div>
        )}
        {onboardStep===2 && (
          <div style={{padding:"32px 24px"}}>
            <div style={{display:"flex", gap:"6px", marginBottom:"28px"}}>{[1,2,3].map(i=><div key={i} style={{flex:1, height:"3px", borderRadius:"2px", background:i<=1?C.primary:C.border}}/>)}</div>
            <div style={{fontSize:"36px", marginBottom:"16px"}}>👋</div>
            <div style={{...ph, fontSize:"22px", fontWeight:"600", color:C.text, marginBottom:"8px"}}>What should we call you?</div>
            <div style={{fontSize:"14px", color:C.textMuted, lineHeight:"1.7", marginBottom:"24px"}}>Cysta is your space. No judgment, no pressure.</div>
            <input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="Your first name" style={{width:"100%", padding:"13px 16px", borderRadius:"12px", border:`0.5px solid ${C.border}`, background:C.bgSoft, fontSize:"15px", color:C.text, outline:"none", ...body, boxSizing:"border-box"}}/>
            <button onClick={()=>setOnboardStep(3)} style={{width:"100%", padding:"14px", borderRadius:"12px", background:C.primary, color:"white", border:"none", fontSize:"15px", fontWeight:"500", cursor:"pointer", marginTop:"20px", ...body}}>Continue</button>
          </div>
        )}
        {onboardStep===3 && (
          <div style={{padding:"32px 24px"}}>
            <div style={{display:"flex", gap:"6px", marginBottom:"28px"}}>{[1,2,3].map(i=><div key={i} style={{flex:1, height:"3px", borderRadius:"2px", background:i<=2?C.primary:C.border}}/>)}</div>
            <div style={{fontSize:"36px", marginBottom:"16px"}}>⚠️</div>
            <div style={{...ph, fontSize:"22px", fontWeight:"600", color:C.text, marginBottom:"8px"}}>Any allergies or intolerances?</div>
            <div style={{fontSize:"13px", color:C.textMuted, lineHeight:"1.7", marginBottom:"20px"}}>Cysta will never suggest recipes with these. Update anytime.</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"20px"}}>
              {ALLERGENS_LIST.map(a=>(
                <div key={a} onClick={()=>toggleAllergen(a)} style={{padding:"11px 12px", borderRadius:"10px", border:`0.5px solid ${selectedAllergens.includes(a)?C.warn:C.border}`, background:selectedAllergens.includes(a)?C.warnLight:C.bgSoft, fontSize:"13px", color:selectedAllergens.includes(a)?C.warn:C.textMuted, cursor:"pointer", display:"flex", alignItems:"center", gap:"8px"}}>
                  {selectedAllergens.includes(a)?"⚠️":"○"} {a}
                </div>
              ))}
            </div>
            <button onClick={()=>setScreen("app")} style={{width:"100%", padding:"14px", borderRadius:"12px", background:C.primary, color:"white", border:"none", fontSize:"15px", fontWeight:"500", cursor:"pointer", ...body}}>Let's go 🌸</button>
            <button onClick={()=>setScreen("app")} style={{width:"100%", padding:"10px", background:"none", border:"none", fontSize:"13px", color:C.textFaint, cursor:"pointer", marginTop:"8px", ...body}}>I have no allergies</button>
          </div>
        )}
      </div>
    </div>
  );

  // MAIN APP
  return (
    <div style={{...body, background:"#F5EDEF", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px"}}>
      <div style={{width:"100%", maxWidth:"390px", background:C.bg, borderRadius:"24px", overflow:"hidden", boxShadow:"0 4px 32px rgba(194,96,122,0.12)", display:"flex", flexDirection:"column", minHeight:"680px"}}>

        {/* HOME */}
        {tab==="home" && (
          <div style={{flex:1, overflowY:"auto"}}>
            <div style={{background:`linear-gradient(135deg,${C.primaryLight} 0%,${C.accentLight} 100%)`, padding:"28px 20px 20px"}}>
              <div style={{fontSize:"13px", color:C.primary, fontWeight:"500", marginBottom:"4px"}}>Good morning{userName?`, ${userName}`:""} 🌸</div>
              <div style={{...ph, fontSize:"22px", fontWeight:"600", color:C.text, marginBottom:"16px"}}>How are you feeling?</div>
              <div style={{display:"flex", gap:"8px"}}>
                {[["😴","Low energy","low"],["🌿","Okay","okay"],["✨","Good","good"]].map(([icon,label,val])=>(
                  <div key={val} onClick={()=>setMood(val)} style={{flex:1, padding:"10px 4px", borderRadius:"12px", border:`0.5px solid ${mood===val?C.primaryBorder:C.border}`, background:mood===val?C.bg:"rgba(255,255,255,0.5)", cursor:"pointer", textAlign:"center", fontSize:"11px", color:mood===val?C.primaryDark:C.textMuted}}>
                    <div style={{fontSize:"20px", marginBottom:"3px"}}>{icon}</div>{label}
                  </div>
                ))}
              </div>
            </div>
            <div style={{padding:"16px 20px"}}>
              <div style={{background:C.primaryLight, border:`0.5px solid ${C.primaryBorder}`, borderRadius:"14px", padding:"14px", marginBottom:"16px"}}>
                <div style={{fontSize:"13px", color:C.primaryDark, lineHeight:"1.7", fontStyle:"italic"}}>"{AFFIRMATIONS[affIdx]}"</div>
                <div onClick={()=>setAffIdx(p=>(p+1)%AFFIRMATIONS.length)} style={{fontSize:"11px", color:C.primary, marginTop:"8px", cursor:"pointer"}}>Tap for a new reminder ↻</div>
              </div>
              <div style={{fontSize:"11px", fontWeight:"500", color:C.textFaint, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"10px"}}>What's going on today?</div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px", marginBottom:"16px"}}>
                {SYMPTOMS.map(s=>(
                  <div key={s} onClick={()=>toggleSymptom(s)} style={{padding:"9px 12px", borderRadius:"10px", border:`0.5px solid ${symptoms.includes(s)?C.primaryBorder:C.border}`, background:symptoms.includes(s)?C.primaryLight:C.bgSoft, fontSize:"12px", color:symptoms.includes(s)?C.primaryDark:C.textMuted, cursor:"pointer"}}>{s}</div>
                ))}
              </div>
              {symptoms.length>0 && (
                <div style={{background:C.accentLight, border:`0.5px solid ${C.accentBorder}`, borderRadius:"12px", padding:"12px 14px", marginBottom:"14px", fontSize:"12px", color:C.accentDark, lineHeight:"1.6"}}>
                  ✨ Based on your symptoms, today's recipes focus on anti-inflammatory and magnesium-rich foods 🌿
                </div>
              )}
              <div onClick={()=>{setTab("recipes");setRecipeCat("all");}} style={{width:"100%", padding:"13px", borderRadius:"12px", border:`0.5px solid ${C.primaryBorder}`, background:C.primaryLight, color:C.primaryDark, fontSize:"13px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", marginBottom:"14px", boxSizing:"border-box"}}>
                🌙 Bad day mode — show me easy meals
              </div>
              <div style={{fontSize:"11px", fontWeight:"500", color:C.textFaint, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"10px"}}>Suggested for you</div>
              {RECIPES.slice(0,2).map(r=>(
                <div key={r.id} onClick={()=>setSelectedRecipe(r)} style={{border:`0.5px solid ${C.border}`, borderRadius:"12px", padding:"11px 12px", marginBottom:"8px", display:"flex", gap:"10px", alignItems:"center", cursor:"pointer", background:C.bg}}>
                  <div style={{width:"42px", height:"42px", background:C.primaryLight, borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0}}>{r.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"13px", fontWeight:"500", color:C.text}}>{r.name}</div>
                    <div style={{fontSize:"11px", color:C.textMuted, marginTop:"2px"}}>{r.meta}</div>
                  </div>
                  <div style={{fontSize:"12px", color:C.primary}}>→</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECIPES */}
        {tab==="recipes" && (
          <div style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden"}}>
            <div style={{background:C.primaryLight, padding:"20px 20px 0", flexShrink:0}}>
              <div style={{...ph, fontSize:"20px", fontWeight:"600", color:C.text, marginBottom:"2px"}}>Recipes</div>
              <div style={{fontSize:"12px", color:C.primary, marginBottom:"12px"}}>10 free · everyday ingredients only</div>
              <div style={{display:"flex", gap:"7px", overflowX:"auto", paddingBottom:"12px", scrollbarWidth:"none"}}>
                <div onClick={()=>setRecipeTab(p=>p==="fav"?"all":"fav")} style={{flexShrink:0, padding:"6px 12px", borderRadius:"20px", fontSize:"12px", border:`0.5px solid ${recipeTab==="fav"?C.primary:C.border}`, background:recipeTab==="fav"?C.primaryLight:"white", color:recipeTab==="fav"?C.primaryDark:C.textMuted, cursor:"pointer"}}>🤍 Saved</div>
                {cats.map(c=>(
                  <div key={c} onClick={()=>{setRecipeTab("all");setRecipeCat(c);}} style={{flexShrink:0, padding:"6px 12px", borderRadius:"20px", fontSize:"12px", border:`0.5px solid ${recipeTab==="all"&&recipeCat===c?C.primary:C.border}`, background:recipeTab==="all"&&recipeCat===c?C.primaryLight:"white", color:recipeTab==="all"&&recipeCat===c?C.primaryDark:C.textMuted, cursor:"pointer", textTransform:"capitalize"}}>
                    {c==="all"?"All":c}
                  </div>
                ))}
              </div>
            </div>
            {undoId && <div onClick={undoHide} style={{background:C.primaryDark, color:"white", fontSize:"12px", padding:"9px 16px", display:"flex", justifyContent:"space-between", cursor:"pointer", flexShrink:0}}><span>Recipe hidden</span><span style={{fontWeight:"500", textDecoration:"underline"}}>Undo</span></div>}
            <div style={{flex:1, overflowY:"auto", padding:"12px 16px"}}>
              {recipeTab==="fav"&&favourites.length===0 && (
                <div style={{textAlign:"center", padding:"40px 20px", color:C.textFaint, fontSize:"13px"}}>
                  <div style={{fontSize:"32px", marginBottom:"10px"}}>🤍</div>Tap the heart on any recipe to save it here
                </div>
              )}
              {filteredRecipes.map(r=><RecipeCard key={r.id} r={r}/>)}
              {showPremiumBanner&&recipeTab==="all" && (
                <div style={{background:`linear-gradient(135deg,${C.primaryLight},${C.accentLight})`, borderRadius:"14px", padding:"16px", marginTop:"8px", border:`0.5px solid ${C.primaryBorder}`, position:"relative"}}>
                  <div onClick={()=>setShowPremiumBanner(false)} style={{position:"absolute", top:"10px", right:"12px", fontSize:"14px", color:C.textFaint, cursor:"pointer"}}>✕</div>
                  <div style={{...ph, fontSize:"15px", fontWeight:"600", color:C.primaryDark, marginBottom:"4px"}}>Unlock unlimited recipes</div>
                  <div style={{fontSize:"12px", color:C.primary, marginBottom:"12px"}}>+ allergen filtering, symptom insights & more</div>
                  <button style={{width:"100%", padding:"10px", borderRadius:"10px", background:C.primary, color:"white", border:"none", fontSize:"13px", cursor:"pointer", ...body}}>Start 1 month free</button>
                  <div style={{fontSize:"11px", color:C.textFaint, marginTop:"7px", textAlign:"center"}}>Then ~20 kr/month. Cancel anytime.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FRIDGE */}
        {tab==="fridge" && (
          <div style={{flex:1, overflowY:"auto"}}>
            <div style={{background:C.primaryLight, padding:"20px 20px 16px"}}>
              <div style={{...ph, fontSize:"20px", fontWeight:"600", color:C.text, marginBottom:"2px"}}>Smart fridge</div>
              <div style={{fontSize:"12px", color:C.primary}}>Based on your most-used recipes</div>
            </div>
            <div style={{padding:"16px 20px"}}>
              {fridgeItems.filter(i=>i.status==="low").length>0 && (
                <div style={{background:C.accentLight, border:`0.5px solid ${C.accentBorder}`, borderRadius:"12px", padding:"11px 14px", marginBottom:"14px", fontSize:"12px", color:C.accentDark}}>
                  ⚠️ {fridgeItems.filter(i=>i.status==="low").map(i=>i.name).join(", ")} — running low?
                </div>
              )}
              <div style={{fontSize:"11px", fontWeight:"500", color:C.textFaint, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"10px"}}>Tap to mark as low</div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px", marginBottom:"16px"}}>
                {fridgeItems.map((item,i)=>(
                  <div key={i} onClick={()=>setFridgeItems(p=>p.map((x,j)=>j===i?{...x,status:x.status==="ok"?"low":"ok"}:x))} style={{padding:"10px 12px", borderRadius:"10px", border:`0.5px solid ${item.status==="low"?C.accentBorder:C.border}`, background:item.status==="low"?C.accentLight:C.bgSoft, fontSize:"12px", color:item.status==="low"?C.accentDark:C.text, cursor:"pointer", display:"flex", alignItems:"center", gap:"7px"}}>
                    <div style={{width:"7px", height:"7px", borderRadius:"50%", background:item.status==="low"?C.accent:C.success, flexShrink:0}}/>{item.name}
                  </div>
                ))}
              </div>
              <div onClick={()=>setTab("recipes")} style={{border:`0.5px solid ${C.border}`, borderRadius:"12px", padding:"13px 14px", fontSize:"13px", color:C.textMuted, display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer"}}>
                <span>What can I make with what I have?</span><span style={{color:C.primary}}>→</span>
              </div>
            </div>
          </div>
        )}

        {/* LOG */}
        {tab==="log" && (
          <div style={{flex:1, overflowY:"auto"}}>
            <div style={{background:C.primaryLight, padding:"20px 20px 16px"}}>
              <div style={{...ph, fontSize:"20px", fontWeight:"600", color:C.text, marginBottom:"2px"}}>Symptom log</div>
              <div style={{fontSize:"12px", color:C.primary}}>No cycle dates needed — Cysta learns your patterns</div>
            </div>
            <div style={{padding:"16px 20px"}}>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"16px"}}>
                <div style={{background:C.bgSoft, borderRadius:"10px", padding:"12px", textAlign:"center"}}>
                  <div style={{...ph, fontSize:"24px", fontWeight:"600", color:C.text}}>4</div>
                  <div style={{fontSize:"11px", color:C.textMuted, marginTop:"2px"}}>Day streak</div>
                </div>
                <div style={{background:C.bgSoft, borderRadius:"10px", padding:"12px", textAlign:"center"}}>
                  <div style={{...ph, fontSize:"24px", fontWeight:"600", color:C.text}}>12</div>
                  <div style={{fontSize:"11px", color:C.textMuted, marginTop:"2px"}}>Anti-inflam. meals</div>
                </div>
              </div>
              <div style={{background:C.accentLight, border:`0.5px solid ${C.accentBorder}`, borderRadius:"12px", padding:"12px 14px", marginBottom:"16px", fontSize:"12px", color:C.accentDark, lineHeight:"1.6"}}>
                ✨ You tend to feel better after eating iron-rich meals. Cysta noticed this over 3 weeks 🌿
              </div>
              <div style={{fontSize:"11px", fontWeight:"500", color:C.textFaint, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"10px"}}>History</div>
              {LOG_HISTORY.map((entry,i)=>(
                <div key={i} style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 0", borderBottom:i<LOG_HISTORY.length-1?`0.5px solid ${C.border}`:"none"}}>
                  <div style={{fontSize:"12px", color:C.textMuted, minWidth:"80px"}}>{entry.date}</div>
                  <div style={{display:"flex", gap:"5px", flexWrap:"wrap", justifyContent:"flex-end"}}>
                    {entry.symptoms.length===0
                      ?<span style={{fontSize:"10px", padding:"2px 8px", borderRadius:"20px", background:C.successLight, color:C.success}}>Good day 🌿</span>
                      :entry.symptoms.map(s=><span key={s} style={{fontSize:"10px", padding:"2px 8px", borderRadius:"20px", background:C.bgSoft, color:C.textMuted, border:`0.5px solid ${C.border}`}}>{s}</span>)
                    }
                  </div>
                </div>
              ))}
              <div style={{background:`linear-gradient(135deg,${C.primaryLight},${C.accentLight})`, borderRadius:"14px", padding:"16px", marginTop:"16px", border:`0.5px solid ${C.primaryBorder}`}}>
                <div style={{...ph, fontSize:"14px", fontWeight:"600", color:C.primaryDark, marginBottom:"4px"}}>Full pattern insights</div>
                <div style={{fontSize:"12px", color:C.primary, marginBottom:"10px"}}>See which foods affect your symptoms — premium</div>
                <button style={{width:"100%", padding:"10px", borderRadius:"10px", background:C.primary, color:"white", border:"none", fontSize:"13px", cursor:"pointer", ...body}}>Start 1 month free</button>
              </div>
            </div>
          </div>
        )}


        {/* SHOP */}
        {tab==="shop" && (
          <div style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden"}}>
            <div style={{background:C.primaryLight, padding:"20px 20px 16px", flexShrink:0}}>
              <div style={{...ph, fontSize:"20px", fontWeight:"600", color:C.text, marginBottom:"2px"}}>Shopping list</div>
              <div style={{fontSize:"12px", color:C.primary}}>Add ingredients from any recipe</div>
            </div>
            <div style={{flex:1, overflowY:"auto", padding:"12px 16px"}}>
              {/* Manual add */}
              <div style={{display:"flex", gap:"8px", marginBottom:"16px"}}>
                <input
                  value={newShopItem}
                  onChange={e=>setNewShopItem(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&addManualItem()}
                  placeholder="Add item manually..."
                  style={{flex:1, padding:"10px 14px", borderRadius:"10px", border:`0.5px solid ${C.border}`, background:C.bgSoft, fontSize:"13px", color:C.text, outline:"none", fontFamily:"'DM Sans', system-ui, sans-serif"}}
                />
                <button onClick={addManualItem} style={{padding:"10px 14px", borderRadius:"10px", background:C.primary, color:"white", border:"none", fontSize:"18px", cursor:"pointer"}}>+</button>
              </div>

              {shoppingList.length === 0 ? (
                <div style={{textAlign:"center", padding:"40px 20px", color:C.textFaint}}>
                  <div style={{fontSize:"40px", marginBottom:"12px"}}>🛒</div>
                  <div style={{fontSize:"14px", fontWeight:"500", color:C.textMuted, marginBottom:"6px"}}>Your list is empty</div>
                  <div style={{fontSize:"12px", lineHeight:"1.6"}}>Open a recipe and tap<br/>"Add ingredients to shopping list"</div>
                </div>
              ) : (
                <>
                  {/* Group by section */}
                  {["Produce","Meat & Fish","Dairy & Fridge","Dry & Canned","Pantry","Other"].map(section => {
                    const items = shoppingList.filter(i => categoriseItem(i.name) === section);
                    if (items.length === 0) return null;
                    return (
                      <div key={section} style={{marginBottom:"16px"}}>
                        <div style={{fontSize:"11px", fontWeight:"500", color:C.textFaint, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"8px", display:"flex", alignItems:"center", gap:"6px"}}>
                          {{Produce:"🥦",["Meat & Fish"]:"🥩",["Dairy & Fridge"]:"🥛",["Dry & Canned"]:"🥫",Pantry:"🫙",Other:"📦"}[section]} {section}
                        </div>
                        {items.map(item=>(
                          <div key={item.id} style={{display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", borderRadius:"10px", background:item.checked?C.bgSoft:C.bg, border:`0.5px solid ${item.checked?C.border:C.primaryBorder}`, marginBottom:"6px", opacity:item.checked?0.6:1}}>
                            <div onClick={()=>toggleShopItem(item.id)} style={{width:"22px", height:"22px", borderRadius:"50%", border:`0.5px solid ${item.checked?C.primary:C.border}`, background:item.checked?C.primary:C.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer", fontSize:"12px", color:"white"}}>
                              {item.checked?"✓":""}
                            </div>
                            <span style={{flex:1, fontSize:"13px", color:item.checked?C.textFaint:C.text, textDecoration:item.checked?"line-through":"none"}}>{item.name}</span>
                            <div onClick={()=>removeShopItem(item.id)} style={{fontSize:"14px", color:C.textFaint, cursor:"pointer", padding:"2px 4px"}}>✕</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}

                  {shoppingList.some(i=>i.checked) && (
                    <button onClick={clearChecked} style={{width:"100%", padding:"11px", borderRadius:"12px", border:`0.5px solid ${C.border}`, background:C.bgSoft, color:C.textMuted, fontSize:"13px", cursor:"pointer", marginTop:"8px", fontFamily:"'DM Sans', system-ui, sans-serif"}}>
                      Clear {shoppingList.filter(i=>i.checked).length} checked item{shoppingList.filter(i=>i.checked).length!==1?"s":""}
                    </button>
                  )}

                  <div style={{background:C.accentLight, border:`0.5px solid ${C.accentBorder}`, borderRadius:"12px", padding:"12px 14px", marginTop:"12px", fontSize:"12px", color:C.accentDark, lineHeight:"1.6"}}>
                    💡 Tip: Open any recipe and tap "Add ingredients to shopping list" to fill this up automatically 🌿
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* BOTTOM NAV */}
        <div style={{display:"flex", borderTop:`0.5px solid ${C.border}`, background:C.bg, flexShrink:0}}>
          {[["home","🏠","Home"],["recipes","📖","Recipes"],["fridge","🧊","Fridge"],["log","📅","Log"],["shop","🛒","Shop"]].map(([id,icon,label])=>(
            <div key={id} onClick={()=>setTab(id)} style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"10px 0 8px", gap:"3px", cursor:"pointer", fontSize:"10px", color:tab===id?C.primary:C.textFaint}}>
              <span style={{fontSize:"18px"}}>{icon}</span>{label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
