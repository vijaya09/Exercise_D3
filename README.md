# Exercise_D3

#How to run Exercise_D3?

1)Clone the git repository by using the following command:
  `git clone https://github.com/vijaya09/Exercise_D3.git`

2)Navigate to the folder Exercise_D3 and make sure you already have `node` installed on your machine.

3)Now run `npm i` in your terminal to install the dependencies.

4)Now open `index.html` in the browser. You can see the visualization tool!!
                                    (or)
4)If you want to run the tool on localhost, run the following command in your terminal:
  `node "path-to-ur-local-Exercise_D3"/node_modules/http-server/bin/http-server`.
Now open the browser and go to `http://127.0.0.1:8080`. You can see the visualization tool!!

#How this system could be tested?

1) On visualization tool loads, it displays all the data for all mutation types and all chromosomes.
2) If only mutation type is changed, then updating the view for that mutation type with all the chromosomes.
3) If only chromosome is changed, then updating the view for the chromosome selected and all the mutation types.
4) If both mutation type and chromosome changed, then performing AND logical operator between chromosome selection and mutation type selection and displaying the result.
5) If no data is present, then just displaying the text "No data is available for the selection"
