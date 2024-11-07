import { DynamicFormComponent, Tool } from 'clk-react-dynamic-form';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// use constants outside of component
const baseApiUrl = 'https://c3edu.online/backend/v1';
// const fileKey = 'lesson-planner-001';
const fileKey = 'elements-demo';
const apiEndpointGetToolId = `${baseApiUrl}/micropal/tools/tool/${fileKey}`;
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInN1YiI6IkNOPWRldixPVT1DM0RldmVsb3BlcixPVT1QZW9wbGUsREM9YzNlZHUsREM9b25saW5lIiwicm9sZXMiOlsiQzNfREVWRUxPUEVSIiwiQzNfQURNSU5JU1RSQVRPUiJdLCJwZXJtaXNzaW9ucyI6WyJSUF9BQ1RJVkVfRElSRUNUT1JZIiwiUlBfQU5BTFlUSUNTIiwiUlBfQVBQUyIsIlJQX0FVRElUIiwiUlBfQkFORFdJRFRIX0xJTUlUUyIsIlJQX0JBVFRFUlkiLCJSUF9CTEFDS19MSVNUSU5HIiwiUlBfQ0FDSElORyIsIlJQX0NMQVNTRVMiLCJSUF9DT05URU5UIiwiUlBfREFTSEJPQVJEIiwiUlBfRklSRVdBTEwiLCJSUF9HUE8iLCJSUF9JTlRFUk5FVF9BQ0NFU1MiLCJSUF9LSU9TSyIsIlJQX0xBTkRJTkdfUEFHRSIsIlJQX0xFQVJOSU5HX1BBVEhTIiwiUlBfTElDRU5TRSIsIlJQX0xPQ0FMX0FSRUFfTkVUV09SSyIsIlJQX01BSU5URU5BTkNFIiwiUlBfTUlDUk9QQUxfQ0hBVCIsIlJQX01JQ1JPUEFMX0hJU1RPUlkiLCJSUF9NSUNST1BBTF9UT09MUyIsIlJQX01PREVNIiwiUlBfTU9OSVRPUklORyIsIlJQX1BST1hZX1NFVFRJTkdTIiwiUlBfUkVNT1RFX1NFUlZJQ0VTIiwiUlBfU0hBUkVTIiwiUlBfVElNRV9DT05GSUdVUkFUSU9OIiwiUlBfVVBEQVRFUiIsIlJQX1VTRVJTIiwiUlBfV0hJVEVMSVNUSU5HIiwiUlBfV0lSRUxFU1MiLCJSUF9XSVJFTEVTU19BQ0NFU1MiXSwibWV0YURhdGEiOnsicHJvZmlsZSI6IkMzRGV2ZWxvcGVyIn0sImlhdCI6MTczMDg4NzA2MywiZXhwIjozMzI4ODQ4NzA2M30.uWjdqoyCgQAZ3eaObdyc4ndokM1POR_JHLf3bPQCOPk';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${accessToken}`
};

function App() {
  const [tool, setTool] = useState<Tool>();
  const count = useRef(0);
  // incerement render counter
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

  const onSubmitHandle = (payload: any) => {
    console.log(`consumer-app onSubmitHandle payload: [${JSON.stringify(payload, undefined, 2)}]`);
  }

  const onCloseHandle = () => {
    console.log('consumer-app onCloseHandle');
  }

  const i18nFn = (input: string, startWith = 'micropal:') => {
    const getResource = `<i18n>${input}</i18n>`;
    // const getResource = undefined;
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