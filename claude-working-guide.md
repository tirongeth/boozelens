# CLAUDE CSS MODULARIZATION WORKFLOW GUIDE

## CRITICAL: THIS GUIDE MUST BE FOLLOWED EXACTLY - NO EXCEPTIONS

### Project Goal
Transform the monolithic `boozelens.css` (2600+ lines) into a professional, market-ready modular CSS architecture WITHOUT changing ANY functionality or fixing ANY bugs.

### Folder Structure (ALREADY CREATED - DO NOT MODIFY)
```
/src/css/
├── /testing/             # BACKUP - NEVER TOUCH
│   └── boozelens.css    # Archive copy - untouched
│
├── /core/               # Foundation modules
│   ├── reset.css
│   ├── variables.css    
│   ├── base.css
│   └── typography.css
│
├── /components/         # Reusable UI components
│   ├── buttons.css
│   ├── cards.css
│   ├── modals.css
│   ├── forms.css
│   ├── badges.css
│   ├── notifications.css
│   └── loaders.css
│
├── /features/           # Feature-specific styles
│   ├── navigation.css
│   ├── dashboard.css
│   ├── friends.css
│   ├── party.css
│   ├── games.css
│   ├── achievements.css
│   ├── emergency.css
│   ├── chat.css
│   ├── auth.css
│   ├── profile.css
│   ├── leaderboard.css
│   └── tracking.css
│
├── /layouts/            # Layout patterns
│   ├── container.css
│   ├── grid.css
│   └── sections.css
│
├── /effects/            # Visual effects
│   ├── animations.css
│   ├── background.css
│   ├── particles.css
│   └── transitions.css
│
├── /utilities/          # Helper classes
│   ├── spacing.css
│   ├── visibility.css
│   ├── colors.css
│   └── responsive.css
│
├── boozelens.css       # CURRENT WORKING FILE (shrinks over time)
├── mobile.css          # Existing mobile styles (untouched)
└── main.css           # Entry point with imports
```

## WORKFLOW RULES - MANDATORY

### ONE FILE PER SESSION RULE
1. **ONLY work on ONE CSS file per step**
2. **NEVER work on multiple files simultaneously**
3. **NEVER skip to another file until current is complete and tested**

### EXACT WORKFLOW FOR EACH FILE

#### Step 1: Read Complete File
```
ALWAYS read the ENTIRE boozelens.css file (all 2600+ lines)
NO EXCEPTIONS - even if you think you know what's in it
```

#### Step 2: Extract Relevant Code
- Find ALL code related to the current module file
- Code may be scattered throughout boozelens.css
- Include ALL related:
  - Selectors
  - @keyframes animations
  - Media queries
  - Pseudo-elements
  - Nested rules

#### Step 3: Move Code to New File
- Copy extracted code to the new module file
- Maintain EXACT formatting and structure
- Keep all comments
- Preserve line breaks and indentation

#### Step 4: Remove from boozelens.css
- Delete ONLY the code that was moved
- Be surgical - don't remove unrelated code
- Keep boozelens.css functional at all times

#### Step 5: Update Imports
- Add import to main.css in the CORRECT order:
  1. Core files first
  2. Effects second
  3. Layouts third
  4. Components fourth
  5. Features fifth
  6. Utilities last
- Ensure import path is correct

#### Step 6: Test
- Run `npm run dev`
- Website MUST work EXACTLY as before
- Check all related functionality
- NO visual changes allowed

### FORBIDDEN ACTIONS

❌ **NEVER FIX BUGS** - even obvious ones
❌ **NEVER OPTIMIZE CODE** - maintain exact behavior
❌ **NEVER ADD FEATURES** - pure migration only
❌ **NEVER REFACTOR** - keep code as-is
❌ **NEVER CHANGE SELECTORS** - maintain specificity
❌ **NEVER COMBINE SIMILAR RULES** - keep duplicates
❌ **NEVER UPDATE OLD SYNTAX** - preserve everything
❌ **NEVER WORK ON MULTIPLE FILES** - one at a time

### TESTING REQUIREMENTS

After EACH file migration:
1. Website loads without errors
2. All styles apply correctly
3. No visual differences
4. All animations work
5. Responsive design intact
6. No console errors

### TESTING CHECKLIST (RUN EVERY TIME)

1. **Start dev server**: `npm run dev`
2. **Visual Check**:
   - Open http://localhost:8000 in browser
   - Compare with production site (https://tirongeth.github.io/boozelens/)
   - Check all affected elements still look correct
   - Test responsive view (F12 → Mobile view)
3. **Console Check**:
   - Open DevTools (F12)
   - Check Console tab for ANY errors
   - Check Network tab - all CSS files should load (200 status)
4. **Specific Feature Test**:
   - Test the specific feature related to migrated CSS
   - For variables: Check if colors/gradients still work
   - For buttons: Click all buttons
   - For animations: Verify they play
5. **Build Test**: `npm run build` (should complete without errors)

### FILE PROCESSING ORDER

RECOMMENDED order (can be adjusted):
1. `core/variables.css` - CSS custom properties
2. `core/reset.css` - Resets and normalizations
3. `core/base.css` - Base element styles
4. `core/typography.css` - Text styles
5. `effects/animations.css` - All @keyframes
6. `effects/background.css` - Background effects
7. `effects/particles.css` - Particle system
8. `effects/transitions.css` - Transitions
9. Continue with components, then features...

### COMPLETION CRITERIA

The migration is complete when:
- boozelens.css is EMPTY (or only has comments)
- All code is in appropriate modules
- main.css imports everything correctly
- Website works EXACTLY as before
- testing/boozelens.css remains untouched

### CRITICAL REMINDERS

⚠️ **ALWAYS read entire boozelens.css first**
⚠️ **ONE file at a time only**
⚠️ **NO fixes or improvements**
⚠️ **Test after EVERY change**
⚠️ **Preserve EXACT functionality**

### Success Metrics
- Zero functionality changes
- Zero visual changes
- Zero new bugs
- 100% feature parity
- Clean modular structure

---

## DO NOT DEVIATE FROM THIS GUIDE