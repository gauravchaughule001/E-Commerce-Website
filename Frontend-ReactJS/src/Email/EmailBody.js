import React from 'react';
export default function EmailBody({name, element}) {


  return (
  <div>
    <h2>HTML Table</h2>

<table style="font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;">
  <tr>
    <th style="border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Company</th>
    <th style="border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Contact</th>
    <th style="border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Country</th>
  </tr>
  <tr>
    <td style="border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Alfreds Futterkiste</td>
    <td style="border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Maria Anders</td>
    <td style="border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Germany</td>
  </tr>
</table>
  </div>
)};