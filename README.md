# Exercise_D3

#How to run Exercise_D3?

1)Clone the git repository by using the following command:
  `git clone https://github.com/vijaya09/Exercise_D3.git`

2)Navigate to the folder Exercise_D3 and make sure you already have `node` installed on your machine.

3)Now run `npm i` in your terminal to install the dependencies.

4)Now open `index.html` in the browser. You can see the visualization tool!!
                                    (or)
If you want to run the tool on localhost, run the following command in your terminal:`npm start`.
Now open the browser and go to `http://localhost:8080 or http://127.0.0.1:8080`. You can see the visualization tool!!

#How this system could be tested?

1) On visualization tool loads, it displays all the data for all mutation types and all chromosomes.
2) If only mutation type is changed, then updating the view for that mutation type with all the chromosomes.
3) If only chromosome is changed, then updating the view for the chromosome selected and all the mutation types.
4) If both mutation type and chromosome changed, then performing AND logical operator between chromosome selection and mutation type selection and displaying the result.
5) If no data is present, then just displaying the text "No data is available for the selection".

->We can test the following scenarios from front end with 100 mutations:
1.	On load of the tool, make sure select all is selected for both the visualizations.
2.	Change the type and check whether both visualizations are showing filtered data.
3.	Change the chromosome and check whether both visualizations are showing filtered data.
4.	Change both values for data that is not available (ex: insertion type and chromosome 9) and check no data is showing.
5.	Display error message if no response from query.
->Test the same with differing mutations like 1000 mutations, 10,000 mutations etc depending on required scope of the tool to make sure results are expected.
->We can write unit test for js functions to make sure they are behaving as expected.
