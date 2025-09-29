cd "c:\Users\Futur\Desktop\NinjaTech\ntSite"

$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add('http://localhost:8080/')
$http.Start()

Write-Host 'Server running at http://localhost:8080/'
Write-Host 'Press Ctrl+C to stop'

while ($http.IsListening) {
    $context = $http.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $path = $request.Url.LocalPath
    if ($path -eq '/') { 
        $path = '/index.html' 
    }
    
    $filepath = Join-Path $PWD ($path.TrimStart('/'))
    
    if (Test-Path $filepath) {
        $bytes = [System.IO.File]::ReadAllBytes($filepath)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
    }
    
    $response.Close()
}
