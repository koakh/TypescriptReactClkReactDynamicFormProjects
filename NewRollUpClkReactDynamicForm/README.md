# README

> `clk-react-dynamic-form -> /home/c3/clk-react-dynamic-form` is a symbolic link to `clk-react-dynamic-form`

## Bootstrap App

```shell
# start a new Create React App project with TypeScript
$ npx create-react-app my-app --template typescript
# enter path
$ cd my-app
# install package
$ npm i clk-react-dynamic-form
```

> note: package is in our private registry at <https://npm.critical-links.com>

## App.tsx

replace `App.tsx` with

```ts
import { DynamicFormComponent, Tool } from 'clk-react-dynamic-form';
import { useEffect, useState } from 'react';
import './App.css';

const baseApiUrl = 'https://c3edu.online/backend/v1';
const fileKey = 'elements-demo';
const apiEndpointGetToolId = `${baseApiUrl}/micropal/tools/tool/${fileKey}`;
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${accessToken}`
};

function App() {
  const [tool, setTool] = useState<Tool>();

  useEffect(() => {
    let isMounted = true;
    fetch(apiEndpointGetToolId, { headers })
      .then((response) => response.json())
      .then((data: Tool) => {
        if (isMounted) {
          setTool(data);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmitHandle = (payload: any) => {
    console.log(`consumer-app onSubmitHandle payload: [${JSON.stringify(payload, undefined, 2)}]`);
  }

  const onCloseHandle = () => {
    console.log('consumer-app onCloseHandle');
  }

  const i18nFn = (input: string, startWith = 'micropal:') => {
    const getResource = `<i18n>${input}</i18n>`;
    return input.startsWith(startWith)
      ? getResource ? getResource : `invalid resource key '${input}'`
      : input;
  }

  return (
    <div className="App">
      <div className="main-container">
        {/* NOTE: onCloseHandle={onCloseHandle} is optional, if omited close button doesn't appear in form */}
        {tool && <DynamicFormComponent tool={tool} i18nFn={i18nFn} onSubmitHandle={onSubmitHandle} onCloseHandle={onCloseHandle} />}
      </div>
    </div>
  );
}

export default App;
```

> NOTE: don't forget to replace `accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'` with a valid c3-backend token

## App.css

replace `App.css` with

```css
html * {
  font-size: 1em !important;
  font-family: "Roboto", sans-serif !important;
}

body {
  background-color: #dedede;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

.main-container {
  border: 1px solid #888;
  border-radius: 8px;
  padding: 10px;
  background-color: white;
  width: 50vw;
  margin: auto;
  margin-top: 20px;
}

.form-element {
  margin-bottom: 1rem;
}
```
