$(function() {
    var reveal = Reveal();
    reveal.initialize({
        // Display controls in the bottom right corner
        controls: true,

        // Display a presentation progress bar
        progress: true,

        // If true; each slide will be pushed to the browser history
        history: true,

        // Loops the presentation, defaults to false
        loop: false,

        // Flags if mouse wheel navigation should be enabled
        mouseWheel: true,

        // Apply a 3D roll to links on hover
        rollingLinks: true,

        // UI style
        theme: 'default', // default/neon/beige

        // Transition style
        transition: 'default' // default/cube/page/concave/linear(2d)
    });
});
