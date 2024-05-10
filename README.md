# Template

This is a React JS template that allows you to create a basic web app easily. The capability to navigate between pages is avaiable and add your own (see section below).

## Changing Pages

This template uses [react-router-dom](https://reactrouter.com/docs/en/v6) to allow for the navigation between pages within the web app. Below is the procedure that you will have to follow when adding your own pages. 

The First thing that you will have to do to create a JSX file containg your new page within the [pages](#src/pages/) folder. You should name this file the name of your page.

After you have created the file for your new page you can go ahead and copy the code below into that file. You can add all the content for the page within the main tags. I would reconmend just naming the function containg all the pages content the same as the name of the file.
```
// in src/pages/YourPage.jsx

import React from 'react';

import Header from "./components/Header";
import Footer from "./components/Footer";
import "../App.css";

function YourPage() {
    
    return (
        <>
            <Header />
            <main>
                // create your pages content within the main tags
            </main>
            <Footer />
        </>
    );
}

export default YourPage;
```
Next, in order to navigate to your new page you will have to create a route within the [App.jsx](#/src/App.jsx) file. You will first need to import the function that returns the pages content from the file your new page file. Then to create the route to the page yo will have to create a Route tag and set the path to "/" then whatever your page name is then set the element to {<the name of your page />} />. Hopefully the code below is of use.

```
// in src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
import NoPage from "./pages/404";

// import your page
import YourPage from "./pages/YourPage";

<BrowserRouter>
    <Routes>
         <Route path="/">
             <Route index element={<Home />} />
             <Route path="*" element={<NoPage />} />

             // create route to your page
             <Route path="/YourPage" element={<YourPage />} />

        </Route>
    </Routes>
</BrowserRouter>
```
Now when you add "/your page name" to your web app URL it will navigate to your page. If you want to add your page into the header component than use th code below to do so.
```
// in src/pages/components/Header.jsx

import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Header() {

    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }

    const closeMenu = () => {
        setNavbarOpen(false)
    }
    
    return (
        <div id="header">
            <a className="logo" href="">
              <svg xmlns="http://www.w3.org/2000/svg" width="118" height="25" viewBox="0 0 118 25">
                    <g fill="none" fillRule="evenodd">
                    </g>
                </svg>SVG Logo
		    </a>
    		<nav>	
    		 <ul className="nav-bar"><div class="bg"></div>
    			<li>
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                // add list item containing the link to your page
                <li>
                    <Link className="nav-link" to="/YourPage">YourPage</Link>
                </li>
    			<li>
                    <a className="nav-link" target="_blank" href="https://github.com/your username">Github</a>
                </li>
                <li className="hamburger-container">
                    <button className="hamburger" onClick={handleToggle}>
                        <svg width="24px" height="24px" fill="#111" viewBox="0 0 24 24">
                            <path d="M21 13H3c-.6 0-1-.4-1-1s.4-1 1-1h18c.6 0 1 .4 1 1s-.4 1-1 1zm0-8H3c-.6 0-1-.4-1-1s.4-1 1-1h18c.6 0 1 .4 1 1s-.4 1-1 1zm0 16H3c-.6 0-1-.4-1-1s.4-1 1-1h18c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
                        </svg>
                    </button>
                    <div className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                        <button className="hamburger exit" onClick={() => closeMenu()}exact>
                            <svg className="exit-svg" width="24px" height="24px" fill="#111" viewBox="0 0 24 24">
                                <line x1="10" y1="10" x2="20" y2="20" stroke="#000" stroke-width="1" />
                                <line x1="20" y1="10" x2="10" y2="20" stroke="#000" stroke-width="1" />
                            </svg>
                        </button>
                        <ul className="menu-list"><div class="bg"></div>
                            <br></br>
                            <br></br>
                            <br></br>
                            
                			<li>
                                <Link className="menu-nav-link" to="/">Home</Link>
                            </li>
                            <br></br>
                            // add list item containing the link to your page (this is for the hamburger menu)
                            <li>
                                <Link className="menu-nav-link" to="/YourPage">YourPage</Link>
                			</li>
                            <br></br>
                            
                            <li>
                                <a className="menu-nav-link" target="_blank" href="https://github.com/your username">Github</a>
                            </li>
                        </ul>
                    </div>
                </li>
    		 </ul>
    		</nav>
        </div>
    );
}

export default Header;
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)