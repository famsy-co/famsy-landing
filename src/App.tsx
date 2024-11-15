import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Globe,
  Database,
  Github,
  Moon,
  Sun,
  LogIn,
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Azarfood",
    description: "Where great food meets great minds.",
    frontend: "https://azarfood-frontend.vercel.app/",
    api: "https://azarfood-api.famsy.ir/",
    github: "https://github.com/azarfood/azarfood-frontend",
  },
  {
    id: 2,
    name: "Clinic Office",
    description: "SE2 project. online clinic management app",
    frontend: "https://famsy-clinic-office.vercel.app/",
    github: "https://github.com/famsy-co/clinic-frontend",
  },
  {
    id: 3,
    name: "FarmSens",
    description: "FarmSens Yusef Project",
    api: "https://farm-sens.famsy.ir/",
  },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setDarkMode(e.matches);
      });
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(projects, {
        keys: ["name", "description"],
        threshold: 0.3,
      }),
    [],
  );

  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects;
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-3 md:py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
              FAMSY
            </h1>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative ml-10">
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 dark:bg-gray-700 dark:text-white text-xs md:text-sm"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleDarkMode}
                className="dark:bg-gray-700 dark:text-white flex-shrink-0"
              >
                {darkMode ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
              </Button>
              <a href="https://admin.famsy.ir">
                <Button
                  variant="outline"
                  size="sm"
                  className=" dark:bg-gray-700 dark:text-white h-9"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </a>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full">
          <div className="px-4 py-6 sm:px-0">
            <div
              ref={parent}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="flex flex-col justify-between dark:bg-gray-800"
                >
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.frontend != null && (
                        <Badge
                          variant="secondary"
                          className="dark:bg-gray-700 dark:text-white"
                        >
                          Frontend
                        </Badge>
                      )}
                      {project.api != null && (
                        <Badge
                          variant="secondary"
                          className="dark:bg-gray-700 dark:text-white"
                        >
                          API
                        </Badge>
                      )}
                      {project.github != null && (
                        <Badge
                          variant="secondary"
                          className="dark:bg-gray-700 dark:text-white"
                        >
                          GitHub
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-start gap-2">
                    {project.frontend != null && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      >
                        <a
                          href={project.frontend}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          Frontend
                        </a>
                      </Button>
                    )}
                    {project.api != null && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      >
                        <a
                          href={project.api}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Database className="mr-2 h-4 w-4" />
                          API
                        </a>
                      </Button>
                    )}
                    {project.github != null && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <footer className="bg-white dark:bg-gray-800 shadow mt-8 mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 dark:text-gray-400">
                &copy; 2024 FAMSY. All rights reserved.
              </p>
              <nav className="flex space-x-4">
                {/*
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy
                </a>
			*/}
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
