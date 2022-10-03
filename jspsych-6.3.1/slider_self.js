<script type="text/javascript">
        $(document).ready(function () {
            $("#type").roundSlider({
                svgMode: true,
                value: 45,
            });
            $("#shape").roundSlider({
                svgMode: true,
                value: 60,
                sliderType: "min-range"
            });
        });
        function sliderTypeChanged(e) {
            $("#type").roundSlider({ sliderType: e.value });
        }
        function sliderShapeChanged(e) {
            var options = { circleShape: e.value };
            if (e.value == "pie") options["startAngle"] = 0;
            else if (e.value == "custom-quarter" || e.value == "custom-half") options["startAngle"] = 45;
            $("#shape").roundSlider(options);
        }
    </script>