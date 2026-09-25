import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ThemeToggle"
import PillButton from "@/components/PillButton"
import { useIsAuthed } from "@/utils/auth"
import { cn } from "@/lib/utils"

const navItems: { label: string; id?: string; to?: string }[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Work", id: "projects" },
  { label: "Products", to: "/products" },
  { label: "Learn", to: "/learn" },
  { label: "Speaking", to: "/speaking" },
]

export const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === "/"
  // Solid bar on inner pages (light bg) or once the homepage is scrolled
  const solid = scrolled || !isHome
  const isAuthed = useIsAuthed()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll-spy: highlight the nav link for the section currently in view
  useEffect(() => {
    if (!isHome) return
    const ids = navItems.filter((i) => i.id).map((i) => i.id!)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHome])

  const isActive = (item: (typeof navItems)[number]) =>
    item.to ? pathname === item.to : isHome && activeSection === item.id

  const linkClass = (active: boolean) =>
    cn(
      navigationMenuTriggerStyle(),
      "bg-transparent border-none px-4 py-2 transition-all duration-200",
      active
        ? solid
          ? "text-[#9a6f00] dark:text-[#e9c766]"
          : "text-[#e9c766]"
        : solid
          ? "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
          : "text-white/85 hover:bg-white/10 hover:text-white"
    )

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate(`/#${targetId}`)
    }
    setIsOpen(false)
  }

  const iconClass = solid
    ? "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
    : "text-white hover:bg-white/10"

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${solid ? 'bg-white dark:bg-[#141414] shadow-sm' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Link className="flex items-center space-x-3 group" to="/">
          <img
            src="/logo-mono.png"
            alt="Godfrey Joseph logo"
            className="h-10 w-auto rounded-lg group-hover:opacity-80 transition-opacity"
          />
        </Link>

        <div className="hidden lg:flex items-center justify-between w-full">
          <div className="flex-1"></div>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.to ? (
                      <NavigationMenuLink asChild className={linkClass(isActive(item))}>
                        <Link to={item.to}>{item.label}</Link>
                      </NavigationMenuLink>
                    ) : (
                      <NavigationMenuLink
                        className={linkClass(isActive(item))}
                        href={`#${item.id}`}
                        onClick={(e) => handleSmoothScroll(e, item.id!)}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex-1 flex justify-end items-center space-x-2">
            {isAuthed && (
              <PillButton href="/admin" variant={solid ? "outlineInk" : "outline"} size="sm">
                <span className="inline-flex items-center gap-2">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Admin
                </span>
              </PillButton>
            )}
            <ThemeToggle className={iconClass} />
            <PillButton href="/#contact" variant="gold" arrow>
              Get in touch
            </PillButton>
          </div>
        </div>

        <div className="lg:hidden flex items-center space-x-1">
          <ThemeToggle className={iconClass} />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(iconClass, "transition-colors")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white dark:bg-[#141414]">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-3 text-[#3d5a8c] dark:text-[#8fb4e8]">
                  <img
                    src="/logo-mono.png"
                    alt="Godfrey Joseph logo"
                    className="h-8 w-auto rounded-md"
                  />
                  Godfrey
                </SheetTitle>
                <SheetDescription className="text-black/60 dark:text-white/60 text-left" >
                  I build. I teach. I guide.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 mt-6">
                {navItems.map((item) => {
                  const active = isActive(item)
                  const mobileClass = `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    active
                      ? "text-[#9a6f00] dark:text-[#e9c766] bg-[#d4a017]/10"
                      : "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#3d5a8c] dark:hover:text-[#8fb4e8]"
                  }`
                  const dot = (
                    <span className={`w-2 h-2 bg-[#d4a017] rounded-full transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></span>
                  )
                  return item.to ? (
                    <Link
                      key={item.label}
                      to={item.to}
                      className={mobileClass}
                      onClick={() => setIsOpen(false)}
                    >
                      {dot}
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={`#${item.id}`}
                      className={mobileClass}
                      onClick={(e) => handleSmoothScroll(e, item.id!)}
                    >
                      {dot}
                      <span>{item.label}</span>
                    </a>
                  )
                })}
                <div className="mt-4 space-y-2 px-4" onClick={() => setIsOpen(false)}>
                  <PillButton href="/#contact" variant="gold" arrow className="w-full justify-center">
                    Get in touch
                  </PillButton>
                  {isAuthed && (
                    <PillButton href="/admin" variant="outlineInk" className="w-full justify-center">
                      <span className="inline-flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Dashboard
                      </span>
                    </PillButton>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
