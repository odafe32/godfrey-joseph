import { useState, useEffect } from "react"
import { Menu, ArrowRight } from "lucide-react"
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
import { cn } from "@/lib/utils"

export const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector('#' + targetId)
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    // Close mobile menu if open
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <a className="flex items-center space-x-3 group" href="/">
          <span className="font-bold text-lg text-[#3d5a8c] group-hover:opacity-80 transition-opacity">Godfrey</span>
        </a>
        
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex-1"></div>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-black hover:bg-black/5 hover:text-black border-none px-4 py-2 transition-all duration-200")}
                    href="#home"
                    onClick={(e) => handleSmoothScroll(e, 'home')}
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-black hover:bg-black/5 hover:text-black border-none px-4 py-2 transition-all duration-200")}
                    href="#about"
                    onClick={(e) => handleSmoothScroll(e, 'about')}
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-black hover:bg-black/5 hover:text-black border-none px-4 py-2 transition-all duration-200")}
                    href="#services"
                    onClick={(e) => handleSmoothScroll(e, 'services')}
                  >
                    Services
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-black hover:bg-black/5 hover:text-black border-none px-4 py-2 transition-all duration-200")}
                    href="#projects"
                    onClick={(e) => handleSmoothScroll(e, 'projects')}
                  >
                    Projects
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-black hover:bg-black/5 hover:text-black border-none px-4 py-2 transition-all duration-200")}
                    href="#contact"
                    onClick={(e) => handleSmoothScroll(e, 'contact')}
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          
          <div className="flex-1 flex justify-end">
            <Button 
              className="bg-[#3d5a8c] text-white hover:bg-[#3d5a8c]/90 rounded-full px-4 py-2 h-auto flex items-center space-x-2 transition-all duration-200"
              asChild
            >
              <a href="#contact">
                <span>Get in touch</span>
                <div className="bg-white text-[#3d5a8c] rounded-full p-1 ml-2">
                  <ArrowRight className="h-3 w-3" />
                </div>
              </a>
            </Button>
          </div>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black hover:bg-black/5 transition-colors">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-3 text-[#3d5a8c]">
                  
                  Josephine
                </SheetTitle>
                <SheetDescription className="text-black/60 text-left" >
                  The brand behind the brand,  helping you work smarter, not harder.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 mt-6">
                <a
                  href="#home"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:bg-black/5 hover:text-[#3d5a8c] transition-all duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-[#3d5a8c] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Home</span>
                </a>
                <a
                  href="#about"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:bg-black/5 hover:text-[#3d5a8c] transition-all duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-[#3d5a8c] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>About</span>
                </a>
                <a
                  href="#projects"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:bg-black/5 hover:text-[#3d5a8c] transition-all duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-[#3d5a8c] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Projects</span>
                </a>
                <a
                  href="#services"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:bg-black/5 hover:text-[#3d5a8c] transition-all duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-[#3d5a8c] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Services</span>
                </a>
                <a
                  href="#contact"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:bg-black/5 hover:text-[#3d5a8c] transition-all duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-[#3d5a8c] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Contact</span>
                </a>
                <div className="mt-4 px-4">
                  <Button 
                    className="w-full bg-[#3d5a8c] text-white hover:bg-[#3d5a8c]/90 rounded-full flex items-center justify-center space-x-2"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <a href="#contact">
                      <span>Get in touch</span>
                      <div className="bg-white text-[#3d5a8c] rounded-full p-1">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}