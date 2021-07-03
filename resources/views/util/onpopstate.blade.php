<script>
    const nonReferers = ['/login', '/register'];

    function fetchReferer() {
        return sessionStorage.getItem('referer');
    }

    function storeReferer(referer) {
        sessionStorage.setItem('referer', referer);
        return fetchReferer();
    }

    window.onpopstate = function() {
        const path = window.location.pathname;
        if(!nonReferers.includes(path)){
            storeReferer(path);
        }
        window.location.reload();
    }
</script>