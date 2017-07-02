# Exercise_D3

#How to install Exercise_D3?

1)clone the git repository by using the following command:
  `git clone https://github.com/vijaya09/Exercise_D3.git`

2)Navigate to the folder Exercise_D3 and then do `npm i` to install the dependencies.

3)Now open `index.html` in the browser (or) you can run on localhost using the following command:
  `node "path-to-ur-local-Exercise_D3"/node_modules/http-server/bin/http-server`

4)Now open the browser and got to `http://127.0.0.1:8080`. You can see the visualization tool!!

#How this system could be tested?

1) On visualization tool loads, it displays all the data for all mutation types and all chromosomes.
2) If only mutation type is changed, then updating the view for that mutation type with all the chromosomes.
3) If only chromosome is changed, then updating the view for the chromosome selected and all the mutation types.
4) If both mutation type and chromosome changed, then performing AND logical operator between chromosome selection and mutation type selection and displaying the result.
5) If no data is present, then just displaying the text "No data is available for the selection"
