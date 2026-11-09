export default function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('mazaly-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.currentScript.parentElement.classList.add('dark')}}catch(e){}})();`
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}
