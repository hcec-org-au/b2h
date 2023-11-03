Modelled potential habitat suitability for selected species in south-east Australia, under current and future climate scenarios


These data were developed by Macquarie University (MQ), supplied to New South Wales Office of Environment and Heritage and are downloadable from nswclimaterefugia.net. 
Licensing is under Creative Commons Attribution Australia License (see http://creativecommons.org/licenses/by/3.0/au/deed.en).


MQ has tried to make the information in this product as reliable as possible. However, there is no assurance with respect to its accuracy, and neither organisation will be liable for any loss or damage arising from its use. Potential Habitat Suitability Models should be used as a guide to the distribution of potential habitat only and are not a substitute for field survey by skilled observers. Projections of habitat suitability under future climate scenarios are not forecasts of actual range changes. Resulting maps represent the distribution of habitat based on the environmental variables used to calibrate the model. Therefore, do not solely rely on this information when making any decision.


Users should also consider the scale and limitations of the source data on which it is based, and the modelling technique utilised. The maps are suitable for applications at a regional scale. For additional information on what each of the maps represent and how they were derived, see the Extended Methodology on our website nswclimaterefugia.net. Please report any errors or other feedback to Dr Linda Beaumont (linda.beaumont@mq.edu.au).


The zip file contains numerous geoTIFF files that represent the distribution of suitable habitat (modelled using Maxent) expressed as:
A) Continuous data (ranging from 0 to 1, where 0 represents least suitable and 1 represents most suitable)
B) Binary data (i.e. with values of either 0 or 1, where 0 represents unsuitable and 1 represents suitable)
C) Consensus (i.e. agreement in suitability across all climate scenarios).


More detail is given below:


A) Continuous data - two sets of geoTIFF files labelled as:
i) Genus_species_2000.tif: (current time period) habitat suitability for the current period (multiplied by 1000 to allow storage as integer grid)
ii) Genus_species_xxx_Rmean_yyyy.tif: (future time periods) mean (over three Regional Climate Models, RCM) of continuous habitat suitability for a given Global Climate Model (GCM, xxx), for climate projected for the decade yyyy.


B) Binary - three sets of geoTIFF files labelled as:
i) Genus_species_2000_thr.tif: (current time period) binary habitat suitability thresholded around the suitability value that maximises the sum of test sensitivity and specificity
ii) Genus_species_xxx_Rall_yyyy.tif: (future time periods) binary indication of 100% consensus across the three RCMs, within GCM xxx, at decade yyyy. Values of grid cells will be either 0 or 1. Value 0 indicates suitability under less than 3 RCMs; 1 indicates suitability under all 3 RCMs.
iii) Genus_species_xxx_Rsum_yyyy.tif: (future time periods) same as Genus_species_xxxx_Rall_yyyy.tif, but instead of expressing values from 0-2 as 0 and 3 as 1, these use the full set of values (0-3), i.e. indicating the number of RCMs for which habitat is suitable for GCM xxx. That is, value 0 indicates unsuitable across all RCMs for that GCM, value 1 indicates suitable across 1 RCM, value 2 indicates suitable across 2 RCMs, value 3 indicates suitable across 3 RCMs.


C) Consensus: two sets of geoTIFF files labelled as:
i) Genus_species_Gconsensus_yyyy.tif: (future time periods) number of GCMs for which habitat is suitable under all constituent RCMs in decade yyyy (values range from 0 [unsuitable under 1 or 2 of the RCMs within a GCM] and 4 [suitable under all 4 RCMs in all GCMs])
ii) Genus_species_Rconsensus_yyyy.tif: (future time periods) number of RCMs for which habitat is suitable in decade yyyy (values range from 0 [unsuitable under all 12 RCMs] to 12 [suitable under all 12 RCMs])




Any enquiries about the dataset should be directed to linda.beaumont@mq.edu.au.