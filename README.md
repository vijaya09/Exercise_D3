# Exercise_D3

#Summarize briefly how this system could be tested.

1) On visualization tool loads, it displays all the data for all mutation types and all chromosomes.
2) If only mutation type is changed, then updating the view for that mutation type with all the chromosomes.
3) If only chromosome is changed, then updating the view for the chromosome selected and all the mutation types.
4) If both mutation type and chromosome changed, then performing AND logical operator between chromosome selection and mutation type selection and displaying the result.
5) If no data is present, then just displaying the text "No data is available for the selection"


#Diagram that describes how the tool implemented above works
                                Page loads
                                    |
                            Displays all the data
                                    |
                            -------------------
                          |                     |
                      if mutation             if chromosome selected ?
                      dropdown selected?
                          |                       |
                  update the type             update the chromosome
                  and chromosome overviews      and type overviews
                  based on the data selected   based on selection
