Set WshShell = CreateObject("WScript.Shell")

' 1. Start the Node Server completely INVISIBLE (The '0' hides the window)
WshShell.Run "node server.js", 0, False

' 2. Wait 1 second for the server to wake up
WScript.Sleep 1000

' 3. Open Chrome in "App Mode" (No tabs, no address bar, looks like a real game)
' If you use Edge, change 'chrome' to 'msedge'
WshShell.Run "chrome --app=http://localhost:3000", 1, False

Set WshShell = Nothing