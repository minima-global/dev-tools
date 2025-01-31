import { createFileRoute } from "@tanstack/react-router"
import { useContext } from "react"
import { appContext } from "../AppContext"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  const { block } = useContext(appContext)

  return (
    <>
      <div className="flex gap-4 items-center z-10 absolute top-10 left-10 right-10 justify-between">
        <svg
          width="60"
          height="60"
          viewBox="0 0 37 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-gray-300 transition-all"
        >
          <path
            d="M28.8727 9.20966L27.2806 16.2518L25.2445 7.7553L18.1105 4.86191L16.1816 13.3737L14.4823 3.39225L7.34831 0.51416L0 32.9998H7.79227L10.0427 23.0183L11.742 32.9998H19.5496L21.4632 24.488L23.4993 32.9998H31.2915L36.022 12.0877L28.8727 9.20966Z"
            fill="currentColor"
          />
        </svg>

        {block && (
          <div className="flex items-center gap-2 mt-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-green-500"
            >
              <path d="M12 3C7.95 3 4.21 4.34 1.2 6.6L3 9C5.5 7.12 8.62 6 12 6C15.38 6 18.5 7.12 21 9L22.8 6.6C19.79 4.34 16.05 3 12 3M12 9C9.3 9 6.81 9.89 4.8 11.4L6.6 13.8C8.1 12.67 9.97 12 12 12C14.03 12 15.9 12.67 17.4 13.8L19.2 11.4C17.19 9.89 14.7 9 12 9M12 15C10.65 15 9.4 15.45 8.4 16.2L12 21L15.6 16.2C14.6 15.45 13.35 15 12 15Z" />
            </svg>
            <p className="text-gray-300 font-mono text-sm ">
              Block: {block?.block}
            </p>
          </div>
        )}
      </div>

      <main className="relative min-h-screen flex flex-col items-center justify-center container mx-auto">
        <div className="fixed inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
        linear-gradient(to right, rgba(75, 75, 75, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(75, 75, 75, 0.4) 1px, transparent 1px)
      `,
              backgroundSize: "2rem 2rem",
              backgroundColor: "#000000",
            }}
          />
          <div className="absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 30%, transparent 70%)",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 container mx-auto w-fit p-8 min-h-screen flex flex-col justify-center ">
          <h1 className="text-2xl font-bold mb-4 text-gray-300 font-mono">
            Minima MiniDapp Template
          </h1>
          <div className="space-y-2 mt-5">
            <p className=" font-mono text-gray-300 text-sm">
              1. Edit{" "}
              <span className="bg-gray-800 px-1 font-mono font-bold rounded">
                src/routes/index.tsx
              </span>
            </p>
            <p className="font-mono text-gray-300 text-sm">
              2. See the changes you made instantly
            </p>
          </div>

          <div className="mt-8 flex  space-x-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.minima.global"
              className="w-full"
            >
              <button className="h-10 w-full px-6 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 font-mono text-sm">
                Read our docs
              </button>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.minima.global"
              className="w-full"
            >
              <button className="h-10 w-full px-6 bg-[#222222] text-white font-bold rounded-md hover:bg-[#333333] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 font-mono text-sm">
                Learn
              </button>
            </a>
          </div>

          <div className="mt-8 flex gap-6 absolute bottom-20 container mx-auto w-fit ">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/minimaglobal"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
              </svg>
              Discord
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/minima-global"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://minima.global"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 37 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path d="M28.8727 9.20966L27.2806 16.2518L25.2445 7.7553L18.1105 4.86191L16.1816 13.3737L14.4823 3.39225L7.34831 0.51416L0 32.9998H7.79227L10.0427 23.0183L11.742 32.9998H19.5496L21.4632 24.488L23.4993 32.9998H31.2915L36.022 12.0877L28.8727 9.20966Z" />
              </svg>
              Minima Website
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
