(function render() {
    [].forEach.call(document.getElementsByClassName('user_input'), function(e) {
        e.addEventListener('input', function() {
            setTimeout(generateAvatar, 300);
        });
    });

    function generateAvatar() {
        var canvas = document.getElementById('avatar'),
            ctx = canvas.getContext('2d'),
            canvas_size = parseFloat(document.getElementById('canvassize').value) || 300,
            pixel_size = parseFloat(document.getElementById('pixelsize').value) || 30,
            color = document.getElementById('color').value || 'red',
            username = document.getElementById('name').value || 'haroldfinch';
        
        canvas.width = canvas.height = canvas_size;
        
        function rect(x, y) {
            ctx.beginPath();
            ctx.rect(x, y, pixel_size, pixel_size);
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
        
        function seed(name) {
            var seed = name.split('').reduce(function(p, c) {
                return p + (c.charCodeAt() * (name.indexOf(c) + 1));
            }, 0);

            var x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        }
        
        for (var i=1; i<canvas_size/2; i+=pixel_size) {
            for (var j=1; j<canvas_size-pixel_size; j+=pixel_size) {
                if (Math.floor(seed(username+i+j)*2)) {
                    rect(i, j);
                    rect(canvas_size-pixel_size-i, j);
                }
            }
        }
    }
    
    generateAvatar();
    
}());