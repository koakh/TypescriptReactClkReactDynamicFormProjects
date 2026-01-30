// import { DynamicFormComponent, Tool } from '../.yalc/_clk-react-dynamic-form/dist';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { DynamicFormComponent, Tool } from 'clk-react-dynamic-form';

const showRenderCount = true;
// use constants outside of component
const baseApiUrl = 'https://c3edu.online/backend/v1';
// files prefixed with @ are not proccessed by `/home/c3/c3-backend/data/micropal/tools-src/encrypt-tools.sh` 
// TOOD: revert to @
// const fileKey = '@dev-elements-demo';
// const fileKey = 'dev-elements-demo';
// const fileKey = 'lesson-planner';
// const fileKey = 'topic-explainer';
// const fileKey = 'quiz-generator';
const fileKey = 'summarization';
const apiEndpointGetToolId = `${baseApiUrl}/micropal/tools/tool/${fileKey}`;
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInN1YiI6IkNOPWRldixPVT1DM0RldmVsb3BlcixPVT1QZW9wbGUsREM9YzNlZHUsREM9b25saW5lIiwicm9sZXMiOlsiQzNfREVWRUxPUEVSIiwiQzNfQURNSU5JU1RSQVRPUiJdLCJwZXJtaXNzaW9ucyI6WyJSUF9BQ1RJVkVfRElSRUNUT1JZIiwiUlBfQU5BTFlUSUNTIiwiUlBfQVBQUyIsIlJQX0FVRElUIiwiUlBfQkFORFdJRFRIX0xJTUlUUyIsIlJQX0JBVFRFUlkiLCJSUF9CTEFDS19MSVNUSU5HIiwiUlBfQ0FDSElORyIsIlJQX0NMQVNTRVMiLCJSUF9DT05URU5UIiwiUlBfREFTSEJPQVJEIiwiUlBfRklSRVdBTEwiLCJSUF9HUE8iLCJSUF9JTlRFUk5FVF9BQ0NFU1MiLCJSUF9LSU9TSyIsIlJQX0xBTkRJTkdfUEFHRSIsIlJQX0xFQVJOSU5HX1BBVEhTIiwiUlBfTElDRU5TRSIsIlJQX0xPQ0FMX0FSRUFfTkVUV09SSyIsIlJQX01BSU5URU5BTkNFIiwiUlBfTUlDUk9QQUxfQ0hBVCIsIlJQX01JQ1JPUEFMX0hJU1RPUlkiLCJSUF9NSUNST1BBTF9UT09MUyIsIlJQX01PREVNIiwiUlBfTU9OSVRPUklORyIsIlJQX1BST1hZX1NFVFRJTkdTIiwiUlBfUkVNT1RFX1NFUlZJQ0VTIiwiUlBfU0hBUkVTIiwiUlBfVElNRV9DT05GSUdVUkFUSU9OIiwiUlBfVVBEQVRFUiIsIlJQX1VTRVJTIiwiUlBfV0hJVEVMSVNUSU5HIiwiUlBfV0lSRUxFU1MiLCJSUF9XSVJFTEVTU19BQ0NFU1MiXSwibWV0YURhdGEiOnsicHJvZmlsZSI6IkMzRGV2ZWxvcGVyIn0sImlhdCI6MTczMjIwMzQ1MSwiZXhwIjozMzI4OTgwMzQ1MX0.pQXdqymIbtsQFacq1m4G2sqAaC5lDe2KG4qHBGl3MEU';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${accessToken}`
};

function App() {
  const [tool, setTool] = useState<Tool>();
  const count = useRef(0);

  // To see "True" renders vs Strict Mode lifecycle, 
  // we can use an effect to track mounts.
  useEffect(() => {
    console.log("Component mounted or re-mounted (Strict Mode check), occurs in dev env only");
  }, []);

  // incrementing here shows every time the function runs
  count.current++;

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

  // const buttonStyle = { borderRadius: '20px', marginTop: 10, padding: 0 };

  // Using useCallback ensures the function reference stays the same between renders. Without this, DynamicFormComponent might re-render every time App renders.
  const onSubmitHandle = useCallback((payload: any) => {
    console.log(`consumer-app onSubmitHandle payload: [${JSON.stringify(payload, undefined, 2)}]`);
  }, []);

  // Using useCallback ensures the function reference stays the same between renders. Without this, DynamicFormComponent might re-render every time App renders.
  const onCloseHandle = useCallback(() => {
    console.log('consumer-app onCloseHandle');
  }, []);

  // Using useCallback ensures the function reference stays the same between renders. Without this, DynamicFormComponent might re-render every time App renders.
  const i18nFn = useCallback((input: string, startWith = 'micropal:') => {
    const getResource = `[i18n]${input}[/i18n]`;
    // const getResource = undefined;
    return input.startsWith(startWith)
      ? getResource ? getResource : `invalid resource key '${input}'`
      : input;
  }, []);

  return (
    <div className="App">
      <div className="main-container">
        {(showRenderCount && count) && <p>App render count: {count.current}</p>}
        {/* NOTE: onCloseHandle={onCloseHandle} is optional, if omited close button doesn't appear in form */}
        {tool && <DynamicFormComponent tool={tool} i18nFn={i18nFn} onSubmitHandle={onSubmitHandle} onCloseHandle={onCloseHandle} />}
      </div>
    </div>
  );
}

export default App;