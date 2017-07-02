document.addEventListener("DOMContentLoaded", function(e) {
   var url = "https://dcc.icgc.org/api/v1/projects/GBM-US/mutations?field=id,mutation,type,chromosome,start,end&size=100&order=desc";
   var i, mutationTypeData={}, chromosomeTypeData={}, newTypeData=[], newChromeData=[];

   //getting data from the dcc.icgc.org
   d3.request(url)
    .mimeType("application/json")
    .get(function(xhr){
      var data = JSON.parse(xhr.responseText);
        $.each(data.hits, function(index, item){
          if(!mutationTypeData[item.type]){
            mutationTypeData[item.type] = [];
          }
          mutationTypeData[item.type].push(item);
        });
        $.each(data.hits, function(i, v){
          if(!chromosomeTypeData[v.chromosome]){
            chromosomeTypeData[v.chromosome] = [];
          }
          chromosomeTypeData[v.chromosome].push(v);
        });
        for(var typeNm in mutationTypeData){
            //adding options dynamically to the mutationType select dropdown
            $('.mutationType').append($("<option></option>")
                          .attr("value",typeNm)
                          .text(typeNm));
            var name = typeNm;
            var length = mutationTypeData[typeNm].length;
            var obj = {name: name, length: length}
            newTypeData.push(obj);
        }
        for(var chromeNm in chromosomeTypeData){
            //adding options dynamically to the chromosome select dropdown
            $('.chromosome').append($("<option></option>")
                          .attr("value",chromeNm)
                          .text(chromeNm));
            var name = chromeNm;
            var length = chromosomeTypeData[chromeNm].length;
            var obj = {name: name, length: length}
            newChromeData.push(obj);
        }

        //on mutation type change update the type overview and chromosome overview
        $('.mutationType').change(function(e){
          var mutationData = [], chromeData=[], mc={}, mutationChromeData=[], mcObj, chromosome={}, chromeObj, obj;
          //empty the type overview before updating it
          $("#mutationType").empty();
          if(e.target.value != 'Select All'){
            obj = {name: e.target.value, length: mutationTypeData[e.target.value].length}
            mutationData.push(obj);
            $.each(data.hits, function(ind, val){
              /* if type overview and chromosome overview are not select all,
              //update the type overview and chromosome overview
              based on mutation type selection and chromosome selection. */
              if($('.chromosome')[0].value != 'Select All'){
                if((mutationData[0].name == val.type) && ($('.chromosome')[0].value == val.chromosome)){
                  if(!chromosome[val.chromosome]){
                    chromosome[val.chromosome] = [];
                  }
                  chromosome[val.chromosome].push(val);
                  if(!mc[val.type]){
                    mc[val.type] = [];
                  }
                  mc[val.type].push(val);
                }
              }
              /* if type overview is not select all, and chromosome is select all
              update the type overview and chromosome overview based on the mutation type and
              for all chromosomes. */
              else if(mutationData[0].name == val.type && ($('.chromosome')[0].value == 'Select All')){
                if(!chromosome[val.chromosome]){
                  chromosome[val.chromosome] = [];
                }
                chromosome[val.chromosome].push(val);
                if(!mc[val.type]){
                  mc[val.type] = [];
                }
                mc[val.type].push(val);
              }
            });
            for(var name in chromosome){
              chromeObj = {name: name, length: chromosome[name].length }
              chromeData.push(chromeObj);
            }
            for(var name in mc){
              mcObj = {name: name, length: mc[name].length }
              mutationChromeData.push(mcObj);
            }
            $('#chromosome').empty();
            checkLength(mutationChromeData, chromeData, '#mutationType', '.mutationTypeOverview', '#chromosome', '.chromosomeOverview' );
            // pieChart('#chromosome', chromeData);
          }else {
            barChart('#mutationType', newTypeData);
          }
        });

        //on chromosome type change update the type overview and chromosome overview
        $('.chromosome').change(function(e){
          var chromosomeData = [], mutation=[], mt={}, cm={}, cmObj, chromeMutation=[], muObj, obj;
          $("#chromosome").empty();
          if(e.target.value != 'Select All'){
            obj = {name: e.target.value, length: chromosomeTypeData[e.target.value].length}
            chromosomeData.push(obj);
            $.each(data.hits, function(ind, val){
              /* if type overview and chromosome overview are not select all,
              //update the type overview and chromosome overview
              based on mutation type selection and chromosome selection. */
              if($('.mutationType')[0].value != 'Select All'){
                if((chromosomeData[0].name == val.chromosome) && ($('.mutationType')[0].value == val.type)){
                  if(!mt[val.type]){
                    mt[val.type] = [];
                  }
                  mt[val.type].push(val);
                  if(!cm[val.chromosome]){
                    cm[val.chromosome] = [];
                  }
                  cm[val.chromosome].push(val);
                }
              }
              /* if chromosome overview is not select all, and mutation type is select all
              update the type overview and chromosome overview based on the chromosome and
              for all mutation types. */
              else if(chromosomeData[0].name == val.chromosome && ($('.mutationType')[0].value == 'Select All')){
                if(!mt[val.type]){
                  mt[val.type] = [];
                }
                mt[val.type].push(val);
                if(!cm[val.chromosome]){
                  cm[val.chromosome] = [];
                }
                cm[val.chromosome].push(val);
              }
            });
            for(var name in mt){
              muObj = {name: name, length: mt[name].length }
              mutation.push(muObj);
            }
            for(var name in cm){
              cmObj = {name: name, length: cm[name].length }
              chromeMutation.push(cmObj);
            }
            $("#mutationType").empty();
            checkLength(mutation, chromeMutation, '#mutationType', '.mutationTypeOverview', '#chromosome', '.chromosomeOverview' );
            // pieChart('#chromosome', chromeMutation);
            // barChart('#mutationType', mutation);
          }else {
            pieChart('#chromosome', newChromeData);
          }
        });

      //on page load, display the type overview for all types
      //and chromosome overview for all chromosomes
      barChart('#mutationType', newTypeData);
      pieChart('#chromosome', newChromeData);
  });
});
//function to check the length and update the view
function checkLength(typeData, chromoData, typeId, typeClass, chromoId, chromoClass){
  if(typeData.length > 0 && $(typeId).length == 0){
    $('.noMutationData').length > 0 ? $('.noMutationData').remove() : '';
    $(typeClass).append('<svg id="mutationType" width="500" height="375"></svg>');
    barChart(typeId, typeData);
  }else if(typeData.length > 0 && $(typeId).length > 0){
    $('.noMutationData').length > 0 ? $('.noMutationData').remove() : '' ;
    barChart(typeId, typeData);
  }else{
    $('.noMutationData').length > 0 ? $('.noMutationData').remove() : '' ;
    if($(typeId).length > 0){
      $(typeId).remove();
      $(typeClass).append('<p class="noMutationData">No data is available for this selection</p>');
    } else {
      $(typeClass).append('<p class="noMutationData">No data is available for this selection</p>');
    }
  }
  if(chromoData.length > 0 && $(chromoId).length == 0){
    $('.noChromoData').length > 0 ? $('.noChromoData').remove() : '' ;
    $(chromoClass).append('<svg id="chromosome" width="350" height="400"></svg>');
    pieChart(chromoId, chromoData);
  }else if(chromoData.length > 0 && $(chromoId).length > 0){
    $('.noChromoData').length > 0 ? $('.noChromoData').remove() : '' ;
    pieChart(chromoId, chromoData);
  }else {
    $('.noChromoData').length > 0 ? $('.noChromoData').remove() : '' ;
    if($(chromoId).length > 0){
      $(chromoId).remove();
      $(chromoClass).append('<p class="noChromoData">No data is available for this selection</p>');
    } else {
      $(chromoClass).append('<p class="noChromoData">No data is available for this selection</p>');
    }
  }
}
