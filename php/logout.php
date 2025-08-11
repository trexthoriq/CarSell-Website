<?php
session_start();
session_destroy();
echo "
  <script>
    localStorage.removeItem('loggedInEmail');
    window.location.href = '../index.html';
  </script>
";
exit;
