export const IS_BROWSER = typeof window !== 'undefined';

export default class Darkmode {
    constructor() {
        if (!IS_BROWSER) {
            console.warn("Detected environment without a `window` object")
            return;
        }

        this.dark = false;

        /* Attach event listeners */
        window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && this.switchThemePrefers())
        window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && this.switchThemePrefers())
        
        const storageValue = localStorage.getItem('darkmode');
        if(storageValue !== null){
            storageValue === 'true' || storageValue === true ? this.toDark() : this.toLight();
        }else{
            this.preferedTheme() ? this.toDark() : this.toLight();
        }
    }

    attach(){
        const css = `
            .toggle-button{
                position: absolute;
                right: 20px;
                bottom: 20px;
                height: 3rem;
                width: 3rem;
                border-radius: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #000;
                cursor: pointer;
            }

            .toggle-button span{
                margin: 0;
            }

            .theme-dark .toggle-button{
                background: #fff;
            }
        `

        const div = document.createElement('div');
        const span = document.createElement('span');
        span.innerHTML = '🌓';
        div.className = "toggle-button";
        div.setAttribute("title", "Toggle dark mode");
        div.setAttribute("aria-label", "Toggle dark mode");
        div.setAttribute("aria-checked", "false");
        div.setAttribute("role", "checkbox");
        div.appendChild(span);

        div.addEventListener('click', () => {
            this.dark === true ? this.toLight() : this.toDark();
        });

        document.body.insertBefore(div, document.body.firstChild);
        this.addStyle(css);
    }

    toLight(){
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('darkmode', 'false');
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        this.dark = false;
    }

    toDark(){
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkmode', 'true');
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
        this.dark = true;
    }

    preferedTheme(){
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    switchThemePrefers() {
        this.preferedTheme() === true ? this.swichToDark() : this.swichToLight()
    }

    addStyle(css) {
        const linkElement = document.createElement('link');
    
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('type', 'text/css');
        linkElement.setAttribute(
          'href',
          'data:text/css;charset=UTF-8,' + encodeURIComponent(css)
        );
        document.head.appendChild(linkElement);
      }
}