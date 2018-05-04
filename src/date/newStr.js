export default `
<html>

<head>
  <script type="text/javascript" src="loadxmldoc.js">
</script>
</head>

<body>

  <script type="text/javascript">
    xmlDoc=loadXMLDoc("books.xml");
    document.write("xmlDoc is loaded, ready for use");
  </script>

</body>

</html>
`
