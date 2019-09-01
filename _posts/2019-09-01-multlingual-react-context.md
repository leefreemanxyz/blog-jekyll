---
layout: post
title: "Using React Hooks and Context to build a multilingual site"
date: 2019-09-01 12:00:00 +0200
categories: code
---

I wrote a post about using React's at-the-time new Context API to deal with translating text strings throughout a React app. Looking back, I think a lot can be improved upon, so here we go.

<!--more-->

Every week there are posts all across the React world asking if Context is killing Redux or if React Hooks are killing Redux. While reports of the death of Redux may have been greatly exaggerated, string translation can be easily done without relying on an external library.

The React docs demonstrate how to use Context, but the examples aren't exactly elegant, especially if you want to make it reusable. So let's take a different approach. Instead, we're going to export a `<LanguageProvider>` component that wraps all our Context functionality together, without polluting the rest of our app. Let's start with something like this:

    import React, { createContext } from "react"

    export const LanguageContext = createContext({
        language: "en",
        strings: {},
        setLanguage: () => {}
    })

    export const LanguageProvider = ({ children }) => {
        const context = {
            language: "en",
            strings: {},
            setLanguage: () => {}
        }
        return (
            <LanguageContext.Provider value={context}>
                {children}
            </LanguageContext.Provider>
        )
    }

which can be exported and used like so:

    import React from "react"
    import ReactDOM from "react-dom"
    import "./index.css"
    import App from "./App"
    import { LanguageProvider } from "./LanguageProvider"

    ReactDOM.render(
        <LanguageProvider>
            <App />
        </LanguageProvider>,
        document.getElementById("root")
    )

Our Language Context is now available throughout the app and it's easy to compose multiple contexts together (e.g. `<ThemeProvider>`, `<WindowContext>`).

We now need to update the LanguageProvider to fetch our translated strings on load and pass them and our updater function into the context so they can be accessed wherever we need it. Let's start with our `fetchTranslation` function. We're going to pass this into the Provider as a prop, rather than hardcode it inside. This provides flexability for if you need to fetch your translations from an API or if they're bundled in your app as separate files.

    export const fetchTranslations = ({ language = "en" }) =>
        import(`../locales/${language}`).then((module) => {
            return module.default
        })

This uses a dynamic import function to load the translations that the user needs (so they hopefully won't need to download the translation file for languages they have no use for). This is just an implementation detail and as long as the LanguageProvider receives an object of key-value pairs, then it doesn't really matter.

So let's update the LanguageProvider to use Hooks to manage everything. We'll useState like so:

    const [{ language, strings }, setLanguage] = useState({
    	language: "en",
    	strings: {}
    });

We'll pass the `language` and `strings` into our context. And add in a useCallback to wrap our `fetchTranslations` function:

    	const updateLanguage = useCallback(
    	async (language) => {
    		const newStrings = await fetchTranslations({ language })
    		setLanguage({
    			language: language,
    			strings: newStrings
    		})
    	},
    	[fetchTranslations]
    )

`UpdateLanguage` can be passed into the context as well. And finally we'll add a useEffect to call the `updateLanguage` function on load:

    useEffect(() => {
    	updateLanguage(language)
    }, [language, updateLanguage])

This results in a wasted extra render (updateLanguage is called in response to being called from the context and also in response to a change in useEffect's dependency array). We could avoid this by hardcoding `updateLanguage('en')`, but if the language comes from a url parameter, then this isn't going to work.

Perhaps we could look at returning early from our updateLanguage function if the current language and newly selected one are the same? This might look something like this, but it doesn't run on first render:

	const updateLanguage = useCallback(
		async (newLang) => {
			if (newLang === language) return
			const newStrings = await fetchTranslations({ language: newLang })
			setLanguage({
				language: newLang,
				strings: newStrings
			})
		},
		[language, fetchTranslations]
	)

Let's fix this with a useRef! The value of useRef will be maintained across renders, but changing its value won't result in a re-render, so we're good. 

	const initialStringsLoaded = useRef(false)

	const updateLanguage = useCallback(
		async (newLang) => {
			if (initialStringsLoaded.current && newLang === language) return
			const newStrings = await fetchTranslations({ language: newLang })
			initialStringsLoaded.current = true
			setLanguage({
				language: newLang,
				strings: newStrings
			})
		},
		[language, fetchTranslations]
	)

And there you have it, all the code you need to get up and running with a multilingual React app with no external dependencies. You can check the full code in [this repo](https://github.com/leefreemanxyz/multilingual-react-with-hooks-and-context).

Any comments, questions or concerns should be directed to my Twitter or GitHub. 