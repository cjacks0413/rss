/* from simple sidebar by start bootstrap */ 
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

function makeWordCloud(myWords) {
    var fill = d3.scale.category20();
    var wordMap = d3.map(); 
    var flattenedWords = []; 
    myWords.concat.apply(flattenedWords, myWords)
                     .map(function(w) {
                        console.log(w);
                        wordMap.set(w.text, w.count);
                     }); 
    console.log(wordMap);
    d3.layout.cloud().size([500, 500])
        .words(wordMap.keys().map(function(d) {
            return { text: d, size: 10 + Math.random() * 90}
        }))
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        //.fontSize(function(d) { return scale(d.frequency, flattenedWords.length); })
        .fontSize(function(d) { return d.size})
        .on("end", draw)
        .start();

    function scale(frequency, total) {
        return frequency / total
    }

    function draw(words) {
        console.log(words);
        d3.select("#wordcloudviz").append("svg")
            .attr("width", 500)
            .attr("height", 500)
        .append("g")
            .attr("transform", "translate(150,150)")
        .selectAll("text")
            .data(words)
        .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }
}