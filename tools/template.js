function redirect(link){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style> 
            .centre {
                text-align: center;
                width: 500px;
                height: 100px;
                left: 30%;
                position: absolute;
            }
            .box{
                box-shadow: 6px 5px 5px #FCEDDA;
            }
            p {
                padding-top: 10px;
                color:#EE4E34;
            }
        </style>
    </head>
    <body>
        <div class="centre box">
        <p>
        Within the next 5 seconds, we will redirect you to the link. Alternatively, you can <a href="${link}">click here</a> immediately. <script>window.setTimeout(function(){
    
                // Move to a new location or you can do something else
                window.location.href = "${link}";
        
            }, 5000);</script></p>
        </div>
    </body>
    </html>`
        
}

module.exports = redirect