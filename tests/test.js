/* ============================================================
   U1 TEST SCRIPT  — host this on GitHub Pages
   Purpose: prove a GitHub Pages JS file loads AND executes over
   the TU network. Flips the red "JS did NOT execute" line to green.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var status = document.getElementById('js-status');
  if (status) {
    status.textContent = '✅ JS LOADED & EXECUTED — external script on GitHub Pages ran successfully';
    status.className = 'status-ok';
  }
  var stamp = document.getElementById('js-time');
  if (stamp) {
    stamp.textContent = 'Script executed at ' + new Date().toLocaleTimeString();
  }
});
