# Homepage Plan — godfrey-joseph.vercel.app

Target structure from `README.md` Section 15, mapped to what exists today.
Sections below run top → bottom. Routes (`/products`, `/learn`, `/speaking`)
are live — homepage sections are teasers that link into them.

| # | Section | Component | Status |
|---|---------|-----------|--------|
| 01 | Hero | `HeroSection` | ✅ Done |
| 02 | Introduction — "More Than Just Software" | `AboutSection` | ✅ Done |
| 03 | What I Do — five areas (Build · Consult · Teach · Coach · Speak) | `ServicesSection` | ✅ Done — five pillar cards + CTA tile |
| 04 | Featured Work — "Things I've Built" | `PortfolioShowcase` | ⚠️ Exists — reframe copy to problem → solution → result |
| 05 | Featured Products — "Things I'm Building" | `FeaturedProducts` | ✅ Done — Meiyo card + upcoming tiles → `/products` |
| 06 | How I Work (supporting) | `WorkToolkit` | ✅ Exists — keep as process proof |
| 07 | Impact Metrics (supporting) | `ImpactMetrics` | ✅ Exists |
| 08 | Teaching — "Learn With Godfrey" | `TeachingSection` | ✅ Done — 3 track cards + CTA strip → `/learn` |
| 09 | Consulting — "Technology Can Do More For Your Business" | `ConsultingSection` | ✅ Done — navy banner + area tiles |
| 10 | Speaking — "Let's Talk About Technology, Business & Growth" | `SpeakingSection` | ✅ Done — photo collage + topics → `/speaking` |
| 11 | Testimonials (proof) | `TestimonialCard` | ✅ Done — carousel w/ avatars + project chips |
| 12 | Kagayaki — "Building Technology Through Kagayaki" | `KagayakiSection` | ✅ Done — dark panel, "Founder" claim → kagaykiglobal.cloud |
| 13 | The Journey — "I'm Still Building" | `JourneySection` | ✅ Done — Building / Learning / Experimenting cards |
| 14 | Final CTA — "Have Something You're Trying to Build?" | `ContactUs` | ✅ Done — 3-path CTA (Work With Me / Consultation / Speak) + direct email |

## Build order

1. ~~ServicesSection → five-areas rework (03)~~ ✅
2. ~~Featured Products teaser (05)~~ ✅
3. ~~Teaching teaser (08)~~ ✅
4. ~~Consulting CTA banner (09)~~ ✅
5. ~~Speaking teaser (10)~~ ✅
6. ~~Kagayaki section (12)~~ ✅
7. ~~Journey section (13)~~ ✅
8. ~~ContactUs → final 3-path CTA (14)~~ ✅
9. PortfolioShowcase copy reframe (04)

## Conventions

Use `PillButton` for CTAs, `SectionHeader` for section tops, `font-display`
headings, `dark:` variants everywhere. See `AGENTS.md`.
