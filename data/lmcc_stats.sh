total=$(jq '. [] | length' lmcc_assets.json)
ramps=$(jq '. [] | map(select(has("BoatRamp") and .BoatRamp == true)) | length' lmcc_assets.json)
jetties=$(jq '. [] | map(select(has("Jetty") and .Jetty == true)) | length' lmcc_assets.json)
baths=$(jq '. [] | map(select(has("Baths") and .Baths == true)) | length' lmcc_assets.json)
total2=$(( ramps + jetties + baths))


echo "ramps: $ramps"
echo "jetties: $jetties"
echo "baths: $baths"
echo "Total Assets: $total2"
echo "Count Sites: $total"
