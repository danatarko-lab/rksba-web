// Prípadové štúdie MOTOTRBO — import z mototrbo.sk/pripadove-studie.
// PDF a náhľady sú self-hostované v public/pripadove-studie/, aby prežili vypnutie mototrbo.sk.
// Vygenerované zo zdrojovej stránky; delenie podľa odvetví je zachované z originálu.

export type CaseStudy = {
  title: string;
  file: string; // nazov PDF v public/pripadove-studie/
  thumb: string; // nahlad prvej strany
};

export type CaseStudyCategory = {
  label: string;
  slug: string;
  items: CaseStudy[];
};

export const caseStudies: CaseStudyCategory[] = [
  {
    label: 'Bankovníctvo',
    slug: 'bankovnictvo',
    items: [
      {
        title: 'HSBC Banking UK',
        file: 'HSBC_Banking_UK.pdf',
        thumb: 'HSBC_Banking_UK_th.jpg',
      },
    ],
  },
  {
    label: 'Stavebníctvo',
    slug: 'stavebnictvo',
    items: [
      {
        title: 'AlpTransit Gotthard TRBOnet SWISS',
        file: 'AlpTransit_Gotthard_TRBOnet_SWISS.pdf',
        thumb: 'AlpTransit_Gotthard_TRBOnet_SWISS_th.jpg',
      },
      {
        title: 'AlpTransit Gotthard2 TRBOnet SWISS',
        file: 'AlpTransit_Gotthard2_TRBOnet_SWISS.pdf',
        thumb: 'AlpTransit_Gotthard2_TRBOnet_SWISS_th.jpg',
      },
      {
        title: 'Eiffage Rail FRANCE',
        file: 'Eiffage_Rail_FRANCE.pdf',
        thumb: 'Eiffage_Rail_FRANCE_th.jpg',
      },
      {
        title: 'Hope Construction Materials Derbyshire UK',
        file: 'Hope_Construction_Materials_Derbyshire_UK.pdf',
        thumb: 'Hope_Construction_Materials_Derbyshire_UK_th.jpg',
      },
      {
        title: 'Mace Construction UK',
        file: 'Mace_Construction_UK.pdf',
        thumb: 'Mace_Construction_UK_th.jpg',
      },
    ],
  },
  {
    label: 'Vzdelávanie',
    slug: 'vzdelavanie',
    items: [
      {
        title: 'Chardon Local Schools Cleveland USA',
        file: 'Chardon_Local_Schools_Cleveland_USA.pdf',
        thumb: 'Chardon_Local_Schools_Cleveland_USA_th.jpg',
      },
      {
        title: 'Cincinnati State Technical College USA',
        file: 'Cincinnati_State_Technical_College_USA.pdf',
        thumb: 'Cincinnati_State_Technical_College_USA_th.jpg',
      },
      {
        title: 'Dallas Count School District IP Site Connect USA',
        file: 'Dallas_Count_School_District_IP_Site_Connect_USA.pdf',
        thumb: 'Dallas_Count_School_District_IP_Site_Connect_USA_th.jpg',
      },
      {
        title: 'Des Moines Public Schools Iowa IP Site Connect USA',
        file: 'Des_Moines_Public_Schools_Iowa_IP_Site_Connect_USA.pdf',
        thumb: 'Des_Moines_Public_Schools_Iowa_IP_Site_Connect_USA_th.jpg',
      },
      {
        title: 'Edinburgh Napier University UK',
        file: 'Edinburgh_Napier_University_UK.pdf',
        thumb: 'Edinburgh_Napier_University_UK_th.jpg',
      },
      {
        title: 'Elmore County Alabama Wave 3000 ConnectPlus Wave3000 USA',
        file: 'Elmore_County_Alabama_Wave_3000_ConnectPlus_Wave3000_USA.pdf',
        thumb: 'Elmore_County_Alabama_Wave_3000_ConnectPlus_Wave3000_USA_th.jpg',
      },
      {
        title: 'Fremont School District 79 Illinois USA',
        file: 'Fremont_School_District_79_Illinois_USA.pdf',
        thumb: 'Fremont_School_District_79_Illinois_USA_th.jpg',
      },
      {
        title: 'Glen Ellyn School District 41 Illinois IP Site Connect USA',
        file: 'Glen_Ellyn_School_District_41_Illinois_IP_Site_Connect_USA.pdf',
        thumb: 'Glen_Ellyn_School_District_41_Illinois_IP_Site_Connect_USA_th.jpg',
      },
      {
        title: 'Hopwood Hall College Manchester UK',
        file: 'Hopwood_Hall_College_Manchester_UK.pdf',
        thumb: 'Hopwood_Hall_College_Manchester_UK_th.jpg',
      },
      {
        title: 'Huntsville City Schools Alabama ConnectPlus USA',
        file: 'Huntsville_City_Schools_Alabama_ConnectPlus_USA.pdf',
        thumb: 'Huntsville_City_Schools_Alabama_ConnectPlus_USA_th.jpg',
      },
      {
        title: 'Keble College Oxford UK',
        file: 'Keble_College_Oxford_UK.pdf',
        thumb: 'Keble_College_Oxford_UK_th.jpg',
      },
      {
        title: 'Kent county school district Maryland USA',
        file: 'Kent_county_school_district_Maryland_USA.pdf',
        thumb: 'Kent_county_school_district_Maryland_USA_th.jpg',
      },
      {
        title: 'North Park University USA',
        file: 'North_Park_University_USA.pdf',
        thumb: 'North_Park_University_USA_th.jpg',
      },
      {
        title: 'Pueblo County School District Colorado USA',
        file: 'Pueblo_County_School_District_Colorado_USA.pdf',
        thumb: 'Pueblo_County_School_District_Colorado_USA_th.jpg',
      },
      {
        title: 'River Valley High School Singapore SG',
        file: 'River_Valley_High_School_Singapore_SG.pdf',
        thumb: 'River_Valley_High_School_Singapore_SG_th.jpg',
      },
      {
        title: 'Sedro-Woolley School District USA',
        file: 'Sedro-Woolley_School_District_USA.pdf',
        thumb: 'Sedro-Woolley_School_District_USA_th.jpg',
      },
      {
        title: 'South-Western City School District Ohio CapacityPlus USA',
        file: 'South-Western_City_School_District_Ohio_CapacityPlus_USA.pdf',
        thumb: 'South-Western_City_School_District_Ohio_CapacityPlus_USA_th.jpg',
      },
      {
        title: 'Technical Institute IP Site Connect USA',
        file: 'Technical_Institute_IP_Site_Connect_USA.pdf',
        thumb: 'Technical_Institute_IP_Site_Connect_USA_th.jpg',
      },
      {
        title: 'University of Cambridge UK',
        file: 'University_of_Cambridge_UK.pdf',
        thumb: 'University_of_Cambridge_UK_th.jpg',
      },
      {
        title: 'University of Kent UK',
        file: 'University_of_Kent_UK.pdf',
        thumb: 'University_of_Kent_UK_th.jpg',
      },
      {
        title: 'University of St. Francis USA',
        file: 'University_of_St._Francis_USA.pdf',
        thumb: 'University_of_St._Francis_USA_th.jpg',
      },
      {
        title: 'Warren County School District USA',
        file: 'Warren_County_School_District_USA.pdf',
        thumb: 'Warren_County_School_District_USA_th.jpg',
      },
      {
        title: 'Washington College USA',
        file: 'Washington_College_USA.pdf',
        thumb: 'Washington_College_USA_th.jpg',
      },
    ],
  },
  {
    label: 'Organizácia podujatí',
    slug: 'organizacia-podujati',
    items: [
      {
        title: 'Aberdeen Exhibition and Conference Centre (Aecc) CapacityPlus SCOTLAND',
        file: 'Aberdeen_Exhibition_and_Conference_Centre_Aecc_CapacityPlus_SCOTLAND.pdf',
        thumb: 'Aberdeen_Exhibition_and_Conference_Centre_Aecc_CapacityPlus_SCOTLAND_th.jpg',
      },
      {
        title: 'ACC Liverpool CapacityPlus UK',
        file: 'ACC_Liverpool_CapacityPlus_UK.pdf',
        thumb: 'ACC_Liverpool_CapacityPlus_UK_th.jpg',
      },
      {
        title: 'Tonhalle Duesseldorf CapacityPlus DEUTCHLAND',
        file: 'Tonhalle_Duesseldorf_CapacityPlus_DEUTCHLAND.pdf',
        thumb: 'Tonhalle_Duesseldorf_CapacityPlus_DEUTCHLAND_th.jpg',
      },
      {
        title: 'United Nations Climate CapacityMax UK',
        file: 'United_Nations_Climate_CapacityMax_UK.pdf',
        thumb: 'United_Nations_Climate_CapacityMax_UK_th.jpg',
      },
      {
        title: 'Veteran Car Run Wave Ptx UK',
        file: 'Veteran_Car_Run_Wave_Ptx_UK.pdf',
        thumb: 'Veteran_Car_Run_Wave_Ptx_UK_th.jpg',
      },
    ],
  },
  {
    label: 'Správa zariadení',
    slug: 'sprava-zariadeni',
    items: [
      {
        title: 'Real estate Portanuova LCPlus ITALY',
        file: 'Real_estate_Portanuova_LCPlus_ITALY.pdf',
        thumb: 'Real_estate_Portanuova_LCPlus_ITALY_th.jpg',
      },
      {
        title: 'VfB Stuttgart Arena GERMANY',
        file: 'VfB_Stuttgart_Arena_GERMANY.pdf',
        thumb: 'VfB_Stuttgart_Arena_GERMANY_th.jpg',
      },
    ],
  },
  {
    label: 'Zdravotníctvo',
    slug: 'zdravotnictvo',
    items: [
      {
        title: 'Greenville Hospital System University Medical Center IP Site Connect USA',
        file: 'Greenville_Hospital_System_University_Medical_Center_IP_Site_Connect_USA.pdf',
        thumb: 'Greenville_Hospital_System_University_Medical_Center_IP_Site_Connect_USA_th.jpg',
      },
      {
        title: 'Indiana University Hospital USA',
        file: 'Indiana_University_Hospital_USA.pdf',
        thumb: 'Indiana_University_Hospital_USA_th.jpg',
      },
      {
        title: 'University College Hospital UK',
        file: 'University_College_Hospital_UK.pdf',
        thumb: 'University_College_Hospital_UK_th.jpg',
      },
      {
        title: 'West Tennessee Healthcare USA',
        file: 'West_Tennessee_Healthcare_USA.pdf',
        thumb: 'West_Tennessee_Healthcare_USA_th.jpg',
      },
    ],
  },
  {
    label: 'Ubytovanie a hotely',
    slug: 'ubytovanie-a-hotely',
    items: [
      {
        title: 'Acqualina Luxury Resort Florida1 USA',
        file: 'Acqualina_Luxury_Resort_Florida1_USA.pdf',
        thumb: 'Acqualina_Luxury_Resort_Florida1_USA_th.jpg',
      },
      {
        title: 'Acqualina Luxury Resort Florida2 USA',
        file: 'Acqualina_Luxury_Resort_Florida2_USA.pdf',
        thumb: 'Acqualina_Luxury_Resort_Florida2_USA_th.jpg',
      },
      {
        title: 'Aloft New Orleans USA',
        file: 'Aloft_New_Orleans_USA.pdf',
        thumb: 'Aloft_New_Orleans_USA_th.jpg',
      },
      {
        title: 'Charity National Trust UK',
        file: 'Charity_National_Trust_UK.pdf',
        thumb: 'Charity_National_Trust_UK_th.jpg',
      },
      {
        title: 'Claridges Hotel UK',
        file: 'Claridges_Hotel_UK.pdf',
        thumb: 'Claridges_Hotel_UK_th.jpg',
      },
      {
        title: 'Edinburgh International Conference Centre EICC CapacityPlus UK',
        file: 'Edinburgh_International_Conference_Centre_EICC_CapacityPlus_UK.pdf',
        thumb: 'Edinburgh_International_Conference_Centre_EICC_CapacityPlus_UK_th.jpg',
      },
      {
        title: 'Excelsior Hotel HONK KONG',
        file: 'Excelsior_Hotel_HONK_KONG.pdf',
        thumb: 'Excelsior_Hotel_HONK_KONG_th.jpg',
      },
      {
        title: 'Fairmont The Palm Dubaj SAE',
        file: 'Fairmont_The_Palm_Dubaj_SAE.pdf',
        thumb: 'Fairmont_The_Palm_Dubaj_SAE_th.jpg',
      },
      {
        title: 'Four Winds Resort and Casino USA',
        file: 'Four_Winds_Resort_and_Casino_USA.pdf',
        thumb: 'Four_Winds_Resort_and_Casino_USA_th.jpg',
      },
      {
        title: 'Hotel California’s Silicon Valley USA',
        file: 'Hotel_Californias_Silicon_Valley_USA.pdf',
        thumb: 'Hotel_Californias_Silicon_Valley_USA_th.jpg',
      },
      {
        title: 'InterContinental Budapest HUNGARY',
        file: 'InterContinental_Budapest_HUNGARY.pdf',
        thumb: 'InterContinental_Budapest_HUNGARY_th.jpg',
      },
      {
        title: 'JW Marriott Marquis Dubai SAE',
        file: 'JW_Marriott_Marquis_Dubai_SAE.pdf',
        thumb: 'JW_Marriott_Marquis_Dubai_SAE_th.jpg',
      },
      {
        title: 'Loughborough Students Union UK',
        file: 'Loughborough_Students_Union_UK.pdf',
        thumb: 'Loughborough_Students_Union_UK_Th.jpg',
      },
      {
        title: 'Marriott San Antonio Hill Country CapacityPlus USA',
        file: 'Marriott_San_Antonio_Hill_Country_CapacityPlus_USA.pdf',
        thumb: 'Marriott_San_Antonio_Hill_Country_CapacityPlus_USA_th.jpg',
      },
      {
        title: 'MGM resorts Nevada USA',
        file: 'MGM_resorts_Nevada_USA.pdf',
        thumb: 'MGM_resorts_Nevada_USA_th.jpg',
      },
      {
        title: 'Portrait Hotel Wave Ptx ITALY',
        file: 'Portrait_Hotel_Wave_Ptx_ITALY.pdf',
        thumb: 'Portrait_Hotel_Wave_Ptx_ITALY_th.jpg',
      },
      {
        title: 'Sun International SOUTH AFRICA',
        file: 'Sun_International_SOUTH_AFRICA.pdf',
        thumb: 'Sun_International_SOUTH_AFRICA_th.jpg',
      },
      {
        title: 'The Peabody Orlando Florida USA',
        file: 'The_Peabody_Orlando_Florida_USA.pdf',
        thumb: 'The_Peabody_Orlando_Florida_USA_th.jpg',
      },
    ],
  },
  {
    label: 'Priemysel a výroba',
    slug: 'priemysel-a-vyroba',
    items: [
      {
        title: 'Automotive Test Track SPAIN',
        file: 'Automotive_Test_Track_SPAIN.pdf',
        thumb: 'Automotive_Test_Track_SPAIN_th.jpg',
      },
      {
        title: 'Aux Sable Illinois CapacityPlus USA',
        file: 'Aux_Sable_Illinois_CapacityPlus_USA.pdf',
        thumb: 'Aux_Sable_Illinois_CapacityPlus_USA_th.jpg',
      },
      {
        title: 'Caleta Quintay Cove Fishery CHILE',
        file: 'Caleta_Quintay_Cove_Fishery_CHILE.pdf',
        thumb: 'Caleta_Quintay_Cove_Fishery_CHILE_th.jpg',
      },
      {
        title: 'Chemical manufacturing Trinseo ITALY',
        file: 'Chemical_manufacturing_Trinseo_ITALY.pdf',
        thumb: 'Chemical_manufacturing_Trinseo_ITALY_th.jpg',
      },
      {
        title: 'Factory Hamburger HUNGARY',
        file: 'Factory_Hamburger_HUNGARY.pdf',
        thumb: 'Factory_Hamburger_HUNGARY_th.jpg',
      },
      {
        title: 'Georgia Nut Company IP Site Connect USA',
        file: 'Georgia_Nut_Company_IP_Site_Connect_USA.pdf',
        thumb: 'Georgia_Nut_Company_IP_Site_Connect_USA_th.jpg',
      },
      {
        title: 'High-Tech Chipmaker CHINA',
        file: 'High-Tech_Chipmaker_CHINA.pdf',
        thumb: 'High-Tech_Chipmaker_CHINA_th.jpg',
      },
      {
        title: 'JJ Waste & Recycling Richards AUSTRALIA',
        file: 'JJ_Waste_and_Recycling_Richards_AUSTRALIA.pdf',
        thumb: 'JJ_Waste_and_Recycling_Richards_AUSTRALIA_th.jpg',
      },
      {
        title: 'Laoshan Forestry CHINA',
        file: 'Laoshan_Forestry_CHINA.pdf',
        thumb: 'Laoshan_Forestry_CHINA_th.jpg',
      },
      {
        title: 'Mackay Sugar AUSTRALIA',
        file: 'Mackay_Sugar_AUSTRALIA.pdf',
        thumb: 'Mackay_Sugar_AUSTRALIA_th.jpg',
      },
      {
        title: 'McCain Foods CapacityPlus NEW ZEALAND',
        file: 'McCain_Foods_CapacityPlus_NEW_ZEALAND.pdf',
        thumb: 'McCain_Foods_CapacityPlus_NEW_ZEALAND_th.jpg',
      },
      {
        title: 'Mercedes Benz Kecskemet HUNGARY',
        file: 'Mercedes_Benz_Kecskemet_HUNGARY.pdf',
        thumb: 'Mercedes_Benz_Kecskemet_HUNGARY_th.jpg',
      },
      {
        title: 'Pringles Kellanova IPSC POLAND',
        file: 'Pringles_Kellanova_IPSC_POLAND.pdf',
        thumb: 'Pringles_Kellanova_IPSC_POLAND_th.jpg',
      },
      {
        title: 'Soufflet Group KAZAKHSTAN',
        file: 'Soufflet_Group_KAZAKHSTAN.pdf',
        thumb: 'Soufflet_Group_KAZAKHSTAN_TH.jpg',
      },
      {
        title: 'Steel Pipe Plant USA',
        file: 'Steel_Pipe_Plant_USA.pdf',
        thumb: 'Steel_Pipe_Plant_USA_th.jpg',
      },
    ],
  },
  {
    label: 'Ropa, plyn, baníctvo a energetika',
    slug: 'ropa-plyn-banictvo-a-energetika',
    items: [
      {
        title: 'African Gas Company IPSC AFRICA',
        file: 'African_Gas_Company_IPSC_AFRICA.pdf',
        thumb: 'African_Gas_Company_IPSC_AFRICA_th.jpg',
      },
      {
        title: 'Callaway Electric Cooperative USA',
        file: 'Callaway_Electric_Cooperative_USA.pdf',
        thumb: 'Callaway_Electric_Cooperative_USA_th.jpg',
      },
      {
        title: 'CEPRO IPSC CZECH',
        file: 'CEPRO_IPSC_CZECH.pdf',
        thumb: 'CEPRO_IPSC_CZECH_th.jpg',
      },
      {
        title: 'CEZ Electricity CZECH',
        file: 'CEZ_Electricity_CZECH.pdf',
        thumb: 'CEZ_Electricity_CZECH_th.jpg',
      },
      {
        title: 'Corporación Nacional de Electricidad ECUADOR',
        file: 'Corporacion_Nacional_de_Electricidad_ECUADOR.pdf',
        thumb: 'Corporacion_Nacional_de_Electricidad_ECUADOR_th.jpg',
      },
      {
        title: 'Deepstore Salt Union Mining UK Winsford UK',
        file: 'Deepstore_Salt_Union_Mining_UK_Winsford_UK.pdf',
        thumb: 'Deepstore_Salt_Union_Mining_UK_Winsford_UK_th.jpg',
      },
      {
        title: 'Electricity distribution company Yedas TURKEY',
        file: 'Electricity_distribution_company_Yedas_TURKEY.pdf',
        thumb: 'Electricity_distribution_company_Yedas_TURKEY_Th.jpg',
      },
      {
        title: 'Hancock-Wood Electric Cooperative IP Site Connect USA',
        file: 'Hancock-Wood_Electric_Cooperative_IP_Site_Connect_USA.pdf',
        thumb: 'Hancock-Wood_Electric_Cooperative_IP_Site_Connect_USA_th.jpg',
      },
      {
        title: 'IFM Ferrara Petrochemical ITALY',
        file: 'IFM_Ferrara_Petrochemical_ITALY.pdf',
        thumb: 'IFM_Ferrara_Petrochemical_ITALY_th.jpg',
      },
      {
        title: 'Impala Platinum SOUTH AFRICA',
        file: 'Impala_Platinum_SOUTH_AFRICA.pdf',
        thumb: 'Impala_Platinum_SOUTH_AFRICA_th.jpg',
      },
      {
        title: 'Khalda-petroleum EGYPT',
        file: 'Khalda-petroleum_EGYPT.pdf',
        thumb: 'Khalda-petroleum_EGYPT_th.jpg',
      },
      {
        title: 'Loesk RUSSIA',
        file: 'Loesk_RUSSIA.pdf',
        thumb: 'Loesk_RUSSIA_th.jpg',
      },
      {
        title: 'Mining Projects Development CONGO',
        file: 'Mining_Projects_Development_CONGO.pdf',
        thumb: 'Mining_Projects_Development_CONGO_th.jpg',
      },
      {
        title: 'Nuclear Energy company Energoatom UKRAINA',
        file: 'Nuclear_Energy_company_Energoatom_UKRAINA.pdf',
        thumb: 'Nuclear_Energy_company_Energoatom_UKRAINA_th.jpg',
      },
      {
        title: 'Oil company Belorusneft BELARUS',
        file: 'Oil_company_Belorusneft_BELARUS.pdf',
        thumb: 'Oil_company_Belorusneft_BELARUS_th.jpg',
      },
      {
        title: 'Power plant USA',
        file: 'Power_plant_USA.pdf',
        thumb: 'Power_plant_USA_th.jpg',
      },
      {
        title: 'Rugeley PowerStation LCP Staffordshire UK',
        file: 'Rugeley_PowerStation_LCP_Staffordshire_UK.pdf',
        thumb: 'Rugeley_PowerStation_LCP_Staffordshire_UK_th.jpg',
      },
      {
        title: 'Siberian Oilfields SmartPTT RUSSIA',
        file: 'Siberian_Oilfields_SmartPTT_RUSSIA.pdf',
        thumb: 'Siberian_Oilfields_SmartPTT_RUSSIA_th.jpg',
      },
      {
        title: 'Sonatrach ALGIER',
        file: 'Sonatrach_ALGIER.pdf',
        thumb: 'Sonatrach_ALGIER_th.jpg',
      },
      {
        title: 'Stadtwerke Barsinghausen DEUTCHLAND',
        file: 'Stadtwerke_Barsinghausen_Hannover_DEUTCHLAND.pdf',
        thumb: 'Stadtwerke_Barsinghausen_DEUTCHLAND_th.jpg',
      },
      {
        title: 'Sumter Electric USA',
        file: 'Sumter_Electric_USA.pdf',
        thumb: 'Sumter_Electric_USA_th.jpg',
      },
      {
        title: 'United Oilfield Services POLAND',
        file: 'United_Oilfield_Services_POLAND.pdf',
        thumb: 'United_Oilfield_Services_POLAND_th.jpg',
      },
      {
        title: 'UST Luga Oil RUSSIA',
        file: 'UST_Luga_Oil_RUSSIA.pdf',
        thumb: 'UST_Luga_Oil_RUSSIA_th.jpg',
      },
      {
        title: 'Wolfe Island Wind Farm CANADA',
        file: 'Wolfe_Island_Wind_Farm_CANADA.pdf',
        thumb: 'Wolfe_Island_Wind_Farm_CANADA_th.jpg',
      },
    ],
  },
  {
    label: 'Ostatné',
    slug: 'ostatne',
    items: [
      {
        title: 'Bridgewater Hall UK',
        file: 'Bridgewater_Hall_UK.pdf',
        thumb: 'Bridgewater_Hall_UK_th.jpg',
      },
      {
        title: 'Gran Paradiso National Park ITALY',
        file: 'Gran_Paradiso_National_Park_ITALY.pdf',
        thumb: 'Gran_Paradiso_National_Park_ITALY_th.jpg',
      },
    ],
  },
  {
    label: 'Väznice',
    slug: 'vaznice',
    items: [
      {
        title: 'Catalonia Prisons IPSC SPAIN',
        file: 'Catalonia_Prisons_IPSC_SPAIN.pdf',
        thumb: 'Catalonia_Prisons_IPSC_SPAIN_th.jpg',
      },
      {
        title: 'HM Prison Rye Hill CapacityPlus UK',
        file: 'HM_Prison_Rye_Hill_CapacityPlus_UK.pdf',
        thumb: 'HM_Prison_Rye_Hill_CapacityPlus_UK_th.jpg',
      },
    ],
  },
  {
    label: 'Bezpečnosť, hasiči a záchranné zložky',
    slug: 'bezpecnost-hasici-a-zachranne-zlozky',
    items: [
      {
        title: 'Benidorm County Police SPAIN',
        file: 'Benidorm_County_Police_SPAIN.pdf',
        thumb: 'Benidorm_County_Police_SPAIN_th.jpg',
      },
      {
        title: 'CityCo Manchester CapacityPlus UK',
        file: 'CityCo_Manchester_CapacityPlus_UK.pdf',
        thumb: 'CityCo_Manchester_CapacityPlus_UK_th.jpg',
      },
      {
        title: 'Disaster Management Coordination Agency Island of Montserrat LCP CARIBBEAN',
        file: 'Disaster_Management_Coordination_Agency_Island_of_Montserrat_LCP_CARIBBEAN.pdf',
        thumb: 'Disaster_Management_Coordination_Agency_Island_of_Montserrat_LCP_CARIBBEAN_th.jpg',
      },
      {
        title: 'Djiboutian Navy IP Site Connect DJIBOUTI',
        file: 'Djiboutian_Navy_IP_Site_Connect_DJIBOUTI.pdf',
        thumb: 'Djiboutian_Navy_IP_Site_Connect_DJIBOUTI_th.jpg',
      },
      {
        title: 'Emergency and Technical Centre Energoatom UKRAINE',
        file: 'Emergency_and_Technical_Centre_Energoatom_UKRAINE.pdf',
        thumb: 'Emergency_and_Technical_Centre_Energoatom_UKRAINE_th.jpg',
      },
      {
        title: 'Emergency Medical Services TRBOnet BRAZIL',
        file: 'Emergency_Medical_Services_TRBOnet_BRAZIL.pdf',
        thumb: 'Emergency_Medical_Services_TRBOnet_BRAZIL_th.jpg',
      },
      {
        title: 'Fire and Rescue Services UK',
        file: 'Fire_and_Rescue_Services_UK.pdf',
        thumb: 'Fire_and_Rescue_Services_UK_th.jpg',
      },
      {
        title: 'Fire Department IP Site Connect TAIWAN',
        file: 'Fire_Department_IP_Site_Connect_TAIWAN.pdf',
        thumb: 'Fire_Department_IP_Site_Connect_TAIWAN_th.jpg',
      },
      {
        title: 'G4S Secure Solution CapacityPlus IVORY COAST',
        file: 'G4S_Secure_Solution_CapacityPlus_IVORY_COAST.pdf',
        thumb: 'G4S_Secure_Solution_CapacityPlus_IVORY_COAST_th.jpg',
      },
      {
        title: 'Galway Mountain Rescue Team IRELAND',
        file: 'Galway_Mountain_Rescue_Team_IRELAND.pdf',
        thumb: 'Galway_Mountain_Rescue_Team_IRELAND_th.jpg',
      },
      {
        title: 'Getafe Council Police SPAIN',
        file: 'Getafe_Council_Police_SPAIN.pdf',
        thumb: 'Getafe_Council_Police_SPAIN_th.jpg',
      },
      {
        title: 'Greater Manchester Fire and Rescue service UK',
        file: 'Greater_Manchester_Fire_and_Rescue_service_UK.pdf',
        thumb: 'Greater_Manchester_Fire_and_Rescue_service_UK_th.jpg',
      },
      {
        title: 'Integrity Ambulance Service IP Site Connect Ohio USA',
        file: 'Integrity_Ambulance_Service_IP_Site_Connect_Ohio_USA.pdf',
        thumb: 'Integrity_Ambulance_Service_IP_Site_Connect_Ohio_USA_th.jpg',
      },
      {
        title: 'Kampala City Council IPSC UGANDA',
        file: 'Kampala_City_Council_IPSC_UGANDA.pdf',
        thumb: 'Kampala_City_Council_IPSC_UGANDA_th.jpg',
      },
      {
        title: 'Kutno Police POLAND',
        file: 'Kutno_Police_POLAND.pdf',
        thumb: 'Kutno_Police_POLAND_th.jpg',
      },
      {
        title: 'Lowland Rescue LCPlus UK',
        file: 'Lowland_Rescue_LCPlus_UK.pdf',
        thumb: 'Lowland_Rescue_LCPlus_UK_th.jpg',
      },
      {
        title: 'Lowland Rescue UK',
        file: 'Lowland_Rescue_UK.pdf',
        thumb: 'Lowland_Rescue_UK_th.jpg',
      },
      {
        title: 'Machala Fire Department IP Site Connect ECUADOR',
        file: 'Machala_Fire_Department_IP_Site_Connect_ECUADOR.pdf',
        thumb: 'Machala_Fire_Department_IP_Site_Connect_ECUADOR_th.jpg',
      },
      {
        title: 'Medical Emergency GEORGIA',
        file: 'Medical_Emergency_GEORGIA.pdf',
        thumb: 'Medical_Emergency_GEORGIA_th.jpg',
      },
      {
        title: 'MOI Thessaloniki GREECE',
        file: 'MOI_Thessaloniki_GREECE.pdf',
        thumb: 'MOI_Thessaloniki_GREECE_th.jpg',
      },
      {
        title: 'Paris Civil Protection FRANCE',
        file: 'Paris_Civil_Protection_FRANCE.pdf',
        thumb: 'Paris_Civil_Protection_FRANCE_th.jpg',
      },
      {
        title: 'Poissy Municipal Police FRANCE',
        file: 'Poissy_Municipal_Police_FRANCE.pdf',
        thumb: 'Poissy_Municipal_Police_FRANCE_th.jpg',
      },
      {
        title: 'Police FIJI',
        file: 'Police_FIJI.pdf',
        thumb: 'Police_FIJI_th.jpg',
      },
      {
        title: 'PROMPT Ambulance Service Northwest Indiana USA',
        file: 'PROMPT_Ambulance_Service_Northwest_Indiana_USA.pdf',
        thumb: 'PROMPT_Ambulance_Service_Northwest_Indiana_USA_th.jpg',
      },
      {
        title: 'Provincial Crisis Management Centre IPSC POLAND',
        file: 'Provincial_Crisis_Management_Centre_IPSC_POLAND.pdf',
        thumb: 'Provincial_Crisis_Management_Centre_IPSC_POLAND_th.jpg',
      },
      {
        title: 'Publier Local Police FRANCE',
        file: 'Publier_Local_Police_FRANCE.pdf',
        thumb: 'Publier_Local_Police_FRANCE_th.jpg',
      },
      {
        title: 'SAMU SaoPaulo BRASIL',
        file: 'SAMU_SaoPaulo_BRASIL.pdf',
        thumb: 'SAMU_SaoPaulo_BRASIL_th.jpg',
      },
      {
        title: 'SCRMITS Medical Rescue POLAND',
        file: 'SCRMITS_Medical_Rescue_POLAND.pdf',
        thumb: 'SCRMITS_Medical_Rescue_POLAND_th.jpg',
      },
      {
        title: 'Somalia’s Police Force SOMALIA',
        file: 'Somalias_Police_Force_SOMALIA.pdf',
        thumb: 'Somalias_Police_Force_SOMALIA_th.jpg',
      },
      {
        title: 'SRPCBA AZORES',
        file: 'SRPCBA_AZORES.pdf',
        thumb: 'SRPCBA_AZORES_th.jpg',
      },
      {
        title: 'Tbilisi Medical Emergency GREECE',
        file: 'Tbilisi_Medical_Emergency_GREECE.pdf',
        thumb: 'Tbilisi_Medical_Emergency_GREECE_th.jpg',
      },
      {
        title: 'Vatican Police Force IPSC VATICAN',
        file: 'Vatican_Police_Force_IPSC_VATICAN.pdf',
        thumb: 'Vatican_Police_Force_IPSC_VATICAN_th.jpg',
      },
      {
        title: 'West Coast District Municipality SOUTH AFRICA',
        file: 'West_Coast_District_Municipality_SOUTH_AFRICA.pdf',
        thumb: 'West_Coast_District_Municipality_SOUTH_AFRICA_th.jpg',
      },
    ],
  },
  {
    label: 'Obchod a retail',
    slug: 'obchod-a-retail',
    items: [
      {
        title: 'Antonine Shopping Centre UK',
        file: 'Antonine_Shopping_Centre_UK.pdf',
        thumb: 'Antonine_Shopping_Centre_UK_th.jpg',
      },
      {
        title: 'Boots the Chemist UK',
        file: 'Boots_the_Chemist_UK.pdf',
        thumb: 'Boots_the_Chemist_UK_th.jpg',
      },
      {
        title: 'Bridgewater Hall Manchester UK',
        file: 'Bridgewater_Hall_Manchester_UK.pdf',
        thumb: 'Bridgewater_Hall_Manchester_UK_th.jpg',
      },
      {
        title: 'Eemits Communications Middlesbrough CapacityMax UK',
        file: 'Eemits_Communications_Middlesbrough_CapacityMax_UK.pdf',
        thumb: 'Eemits_Communications_Middlesbrough_CapacityMax_UK_th.jpg',
      },
      {
        title: 'European Supermarket Chain HUNGARY',
        file: 'European_Supermarket_Chain_HUNGARY.pdf',
        thumb: 'European_Supermarket_Chain_HUNGARY_th.jpg',
      },
      {
        title: 'Gabriel de Castila ANTARCTIC',
        file: 'Gabriel_de_Castila_ANTARCTIC.pdf',
        thumb: 'Gabriel_de_Castila_ANTARCTIC_th.jpg',
      },
      {
        title: 'Hines ITALY',
        file: 'Hines_ITALY.pdf',
        thumb: 'Hines_ITALY_th.jpg',
      },
      {
        title: 'Mall of America Minnesota USA',
        file: 'Mall_of_America_Minnesota_USA.pdf',
        thumb: 'Mall_of_America_Minnesota_USA_th.jpg',
      },
      {
        title: 'Manx Utilities Isle of Man UK',
        file: 'Manx_Utilities_Isle_of_Man_UK.pdf',
        thumb: 'Manx_Utilities_Isle_of_Man_UK_th.jpg',
      },
      {
        title: 'Meadowhall Centre Limited Sheffield CapacityPlus UK',
        file: 'Meadowhall_Centre_Limited_Sheffield_CapacityPlus_UK.pdf',
        thumb: 'Meadowhall_Centre_Limited_Sheffield_CapacityPlus_UK_th.jpg',
      },
      {
        title: 'Melbourne Convention and Exhibition Centre AUSTRALIA',
        file: 'Melbourne_Convention_and_Exhibition_Centre_AUSTRALIA.pdf',
        thumb: 'Melbourne_Convention_and_Exhibition_Centre_AUSTRALIA_th.jpg',
      },
      {
        title: 'Nation Pizza and Foods Schaumburg Illinoiis CapacityPlus USA',
        file: 'Nation_Pizza_and_Foods_Schaumburg_Illinoiis_CapacityPlus_USA.pdf',
        thumb: 'Nation_Pizza_and_Foods_Schaumburg_Illinoiis_CapacityPlus_USA_th.jpg',
      },
      {
        title: 'Plein Disposal Ontario CANADA',
        file: 'Plein_Disposal_Ontario_CANADA.pdf',
        thumb: 'Plein_Disposal_Ontario_CANADA_th.jpg',
      },
      {
        title: 'Property management Hong Lok Yuen HONG KONG',
        file: 'Property_management_Hong_Lok_Yuen_HONG_KONG.pdf',
        thumb: 'Property_management_Hong_Lok_Yuen_HONG_KONG_th.jpg',
      },
      {
        title: 'Sears direct distribution center USA',
        file: 'Sears_direct_distribution_center_USA.pdf',
        thumb: 'Sears_direct_distribution_center_USA_th.jpg',
      },
      {
        title: 'Shopping centre Meadowhall CapacityPlus UK',
        file: 'Shopping_centre_Meadowhall_CapacityPlus_UK.pdf',
        thumb: 'Shopping_centre_Meadowhall_CapacityPlus_UK_th.jpg',
      },
      {
        title: 'The Glades Shopping Centre UK',
        file: 'The_Glades_Shopping_Centre_UK.pdf',
        thumb: 'The_Glades_Shopping_Centre_UK_th.jpg',
      },
      {
        title: 'Tropicana City Mall MALAYSIA',
        file: 'Tropicana_City_Mall_MALAYSIA.pdf',
        thumb: 'Tropicana_City_Mall_MALAYSIA_th.jpg',
      },
      {
        title: 'Westquay Shopping Centre UK',
        file: 'Westquay_Shopping_Centre_UK.pdf',
        thumb: 'Westquay_Shopping_Centre_UK_th.jpg',
      },
    ],
  },
  {
    label: 'Šport a voľný čas',
    slug: 'sport-a-volny-cas',
    items: [
      {
        title: 'AELTC Wimbledon UK',
        file: 'AELTC_Wimbledon_UK.pdf',
        thumb: 'AELTC_Wimbledon_UK_th.jpg',
      },
      {
        title: 'African Football Confederation SOUTH AFRICA',
        file: 'African_Football_Confederation_SOUTH_AFRICA.pdf',
        thumb: 'African_Football_Confederation_SOUTH_AFRICA_th.jpg',
      },
      {
        title: 'Amirsoy Mountain Resort UZBEKISTAN',
        file: 'Amirsoy_Mountain_Resort_UZBEKISTAN.pdf',
        thumb: 'Amirsoy_Mountain_Resort_UZBEKISTAN_th.jpg',
      },
      {
        title: 'Australasian Safari AUSTRALIA',
        file: 'Australasian_Safari_AUSTRALIA.pdf',
        thumb: 'Australasian_Safari_AUSTRALIA_th.jpg',
      },
      {
        title: 'Casela Nature Parks CapacityPlus MAURICIUS',
        file: 'Casela_Nature_Parks_CapacityPlus_MAURICIUS.pdf',
        thumb: 'Casela_Nature_Parks_CapacityPlus_MAURICIUS_th.jpg',
      },
      {
        title: 'Circuit De Barcelona CapacityPlus SPAIN',
        file: 'Circuit_De_Barcelona_CapacityPlus_SPAIN.pdf',
        thumb: 'Circuit_De_Barcelona_CapacityPlus_SPAIN_th.jpg',
      },
      {
        title: 'Echo Arena Liverpool CapacityPlus UK',
        file: 'Echo_Arena_Liverpool_CapacityPlus_UK.pdf',
        thumb: 'Echo_Arena_Liverpool_CapacityPlus_UK_th.jpg',
      },
      {
        title: 'Fulham Football Club UK',
        file: 'Fulham_Football_Club_UK.pdf',
        thumb: 'Fulham_Football_Club_UK_th.jpg',
      },
      {
        title: 'International Ski Federation Bakuriani 2023 World Champion IPSC GEORGIA',
        file: 'International_Ski_Federation_Bakuriani_2023_World_Champion_IPSC_GEORGIA.pdf',
        thumb: 'International_Ski_Federation_Bakuriani_2023_World_Champion_IPSC_GEORGIA_th.jpg',
      },
      {
        title: 'Le Tour de Langkawi IP Connect MALAYSIA',
        file: 'Le_Tour_de_Langkawi_IP_Connect_MALAYSIA.pdf',
        thumb: 'Le_Tour_de_Langkawi_IP_Connect_MALAYSIA_th.jpg',
      },
      {
        title: 'Meadowlands Stadium CapacityPlus USA',
        file: 'Meadowlands_Stadium_CapacityPlus_USA.pdf',
        thumb: 'Meadowlands_Stadium_CapacityPlus_USA_th.jpg',
      },
      {
        title: 'NASCAR USA',
        file: 'NASCAR_USA.pdf',
        thumb: 'NASCAR_USA_th.jpg',
      },
      {
        title: 'Pertamina Mandalika International Circuit INDONESIA',
        file: 'Pertamina_Mandalika_International_Circuit_INDONESIA.pdf',
        thumb: 'Pertamina_Mandalika_International_Circuit_INDONESIA_th.jpg',
      },
      {
        title: 'San Siro Stadium ITALY',
        file: 'San_Siro_Stadium_ITALY.pdf',
        thumb: 'San_Siro_Stadium_ITALY_th.jpg',
      },
      {
        title: 'Santander Sailing World Championships SPAIN',
        file: 'Santander_Sailing_World_Championships_SPAIN.pdf',
        thumb: 'Santander_Sailing_World_Championships_SPAIN_th.jpg',
      },
      {
        title: 'Ski lift company TÉLÉVERBIER SWISS',
        file: 'Ski_lift_company_TELEVERBIER_SWISS.pdf',
        thumb: 'Ski_lift_company_TELEVERBIER_SWISS_TH.jpg',
      },
      {
        title: 'Ski Resort Montgenevre FRANCE',
        file: 'Ski_Resort_Montgenevre_FRANCE.pdf',
        thumb: 'Ski_Resort_Montgenevre_FRANCE_th.jpg',
      },
      {
        title: 'Spartak Stadium Moscow RUSSIA',
        file: 'Spartak_Stadium_Moscow_RUSSIA.pdf',
        thumb: 'Spartak_Stadium_Moscow_RUSSIA_th.jpg',
      },
      {
        title: 'Ullevaal Stadion WPTX NORWAY',
        file: 'Ullevaal_Stadion_WPTX_NORWAY.pdf',
        thumb: 'Ullevaal_Stadion_WPTX_NORWAY_th.jpg',
      },
      {
        title: 'Ultra Trail Mont Blanc CAPACITYPlus SPAIN',
        file: 'Ultra_Trail_Mont_Blanc_CAPACITYPlus_SPAIN.pdf',
        thumb: 'Ultra_Trail_Mont_Blanc_CAPACITYPlus_SPAIN_th.jpg',
      },
      {
        title: 'Wembley Stadium UK',
        file: 'Wembley_Stadium_UK.pdf',
        thumb: 'Wembley_Stadium_UK_th.jpg',
      },
      {
        title: 'Wigan Football Company UK',
        file: 'Wigan_Football_Company_UK.pdf',
        thumb: 'Wigan_Football_Company_UK_th.jpg',
      },
      {
        title: 'Women Tour of Scotland SCOTLAND',
        file: 'Women_Tour_of_Scotland_SCOTLAND.pdf',
        thumb: 'Women_Tour_of_Scotland_SCOTLAND_th.jpg',
      },
    ],
  },
  {
    label: 'Turistika',
    slug: 'turistika',
    items: [
      {
        title: 'Edenproject UK',
        file: 'Edenproject_UK.pdf',
        thumb: 'Edenproject_UK_th.jpg',
      },
      {
        title: 'Leeds Castle Kent UK',
        file: 'Leeds_Castle_Kent_UK.pdf',
        thumb: 'Leeds_Castle_Kent_UK_th.jpg',
      },
      {
        title: 'Observatorium Earth and Sky NEW ZEALAND',
        file: 'Observatorium_Earth_and_Sky_NEW_ZEALAND.pdf',
        thumb: 'Observatorium_Earth_and_Sky_NEW_ZEALAND_th.jpg',
      },
      {
        title: 'Palace of Versailles IP Site Connect FRANCE',
        file: 'Palace_of_Versailles_IP_Site_Connect_FRANCE.pdf',
        thumb: 'Palace_of_Versailles_IP_Site_Connect_FRANCE_th.jpg',
      },
      {
        title: 'ZOO Tallinn WavePTX ESTONIA',
        file: 'ZOO_Tallinn_WavePTX_ESTONIA.pdf',
        thumb: 'ZOO_Tallinn_WavePTX_ESTONIA_th.jpg',
      },
    ],
  },
  {
    label: 'Doprava a logistika',
    slug: 'doprava-a-logistika',
    items: [
      {
        title: 'Air MAURICIUS',
        file: 'Air_MAURICIUS.pdf',
        thumb: 'Air_MAURICIUS_th.jpg',
      },
      {
        title: 'AirAlgerie Algerie IP Site Connect ALGERIE',
        file: 'AirAlgerie_Algerie_IP_Site_Connect_ALGERIE.pdf',
        thumb: 'AirAlgerie_Algerie_IP_Site_Connect_ALGERIE_th.jpg',
      },
      {
        title: 'Airport CLH Aviation Dublin IRELAND',
        file: 'Airport_CLH_Aviation_Dublin_IRELAND.pdf',
        thumb: 'Airport_CLH_Aviation_Dublin_IRELAND_th.jpg',
      },
      {
        title: 'Attila Superyacht CapacityPlus SPAIN',
        file: 'Attila_Superyacht_CapacityPlus_SPAIN.pdf',
        thumb: 'Attila_Superyacht_CapacityPlus_SPAIN_th.jpg',
      },
      {
        title: 'Belgrade Airport CapacityPlus SERBIA',
        file: 'Belgrade_Airport_CapacityPlus_SERBIA.pdf',
        thumb: 'Belgrade_Airport_CapacityPlus_SERBIA_th.jpg',
      },
      {
        title: 'Bombardier Transportation UK',
        file: 'Bombardier_Transportation_UK.pdf',
        thumb: 'Bombardier_Transportation_UK_th.jpg',
      },
      {
        title: 'British Airways Wave London UK',
        file: 'British_Airways_Wave_London_UK.pdf',
        thumb: 'British_Airways_Wave_London_UK_th.jpg',
      },
      {
        title: 'Cooperativa de Transporte Urbano Ciudad de Milagro ECUADOR',
        file: 'Cooperativa_de_Transporte_Urbano_Ciudad_de_Milagro_ECUADOR.pdf',
        thumb: 'Cooperativa_de_Transporte_Urbano_Ciudad_de_Milagro_ECUADOR_th.jpg',
      },
      {
        title: 'Danang Port CapacityPlus VIETNAM',
        file: 'Danang_Port_CapacityPlus_VIETNAM.pdf',
        thumb: 'Danang_Port_CapacityPlus_VIETNAM_th.jpg',
      },
      {
        title: 'Fly Taxi ROMANIA',
        file: 'Fly_Taxi_ROMANIA.pdf',
        thumb: 'Fly_Taxi_ROMANIA_th.jpg',
      },
      {
        title: 'Holmes County Highway USA',
        file: 'Holmes_County_Highway_USA.pdf',
        thumb: 'Holmes_County_Highway_USA_th.jpg',
      },
      {
        title: 'Koltsovo Airport IP Site Connect RUSSIA',
        file: 'Koltsovo_Airport_IP_Site_Connect_RUSSIA.pdf',
        thumb: 'Koltsovo_Airport_IP_Site_Connect_RUSSIA_th.jpg',
      },
      {
        title: 'KTZE Khorgos Gateway KAZAKHSTAN',
        file: 'KTZE_Khorgos_Gateway_KAZAKHSTAN.pdf',
        thumb: 'KTZE_Khorgos_Gateway_KAZAKHSTAN_th.jpg',
      },
      {
        title: 'Mini Trans 4x42 DENMARK',
        file: 'Mini_Trans_4x42_DENMARK.pdf',
        thumb: 'Mini_Trans_4x42_DENMARK_th.jpg',
      },
      {
        title: 'Mobile Trailer Works USA',
        file: 'Mobile_Trailer_Works_USA.pdf',
        thumb: 'Mobile_Trailer_Works_USA_th.jpg',
      },
      {
        title: 'Nami Radioduplex RUSSIA',
        file: 'Nami_Radioduplex_RUSSIA.pdf',
        thumb: 'Nami_Radioduplex_RUSSIA_th.jpg',
      },
      {
        title: 'Nikola Tesla Airport BELGRAD',
        file: 'Nikola_Tesla_Airport_BELGRAD.pdf',
        thumb: 'Nikola_Tesla_Airport_BELGRAD_th.jpg',
      },
      {
        title: 'Perugia Minimetro Line Italy IPSC ITALY',
        file: 'Perugia_Minimetro_Line_Italy_IPSC_ITALY.pdf',
        thumb: 'Perugia_Minimetro_Line_Italy_IPSC_ITALY_th.jpg',
      },
      {
        title: 'Port Atlantique La Rochelle FRANCE',
        file: 'Port_Atlantique_La_Rochelle_FRANCE.pdf',
        thumb: 'Port_Atlantique_La_Rochelle_FRANCE_th.jpg',
      },
      {
        title: 'Public Transport Debrecen HUNGARY',
        file: 'Public_Transport_Debrecen_HUNGARY.pdf',
        thumb: 'Public_Transport_Debrecen_HUNGARY_th.jpg',
      },
      {
        title: 'Seaport CapacityPlus VIETNAM',
        file: 'Seaport_CapacityPlus_VIETNAM.pdf',
        thumb: 'Seaport_CapacityPlus_VIETNAM_th.jpg',
      },
      {
        title: 'Shanghai Port CHINA',
        file: 'Shanghai_Port_CHINA.pdf',
        thumb: 'Shanghai_Port_CHINA_th.jpg',
      },
      {
        title: 'Sociedad Concesionaria Los Lagos TRBOnet CHILE',
        file: 'Sociedad_Concesionaria_Los_Lagos_TRBOnet_CHILE.pdf',
        thumb: 'Sociedad_Concesionaria_Los_Lagos_TRBOnet_CHILE_th.jpg',
      },
      {
        title: 'Stagecoach UK Bus Manchester UK',
        file: 'Stagecoach_UK_Bus_Manchester_UK.pdf',
        thumb: 'Stagecoach_UK_Bus_Manchester_UK_th.jpg',
      },
      {
        title: 'Stansted Airport CapacityMax UK',
        file: 'Stansted_Airport_CapacityMax_UK.pdf',
        thumb: 'Stansted_Airport_CapacityMax_UK_th.jpg',
      },
      {
        title: 'TAV Airport Skopje MACEDONIA',
        file: 'TAV_Airport_Skopje_MACEDONIA.pdf',
        thumb: 'TAV_Airport_Skopje_MACEDONIA_th.jpg',
      },
      {
        title: 'The Kearney logistics companies ConnectPlus Louisiana USA',
        file: 'The_Kearney_logistics_companies_ConnectPlus_Louisiana_USA.pdf',
        thumb: 'The_Kearney_logistics_companies_ConnectPlus_Louisiana_USA_th.jpg',
      },
      {
        title: 'Triangle Aviation Services USA',
        file: 'Triangle_Aviation_Services_USA.pdf',
        thumb: 'Triangle_Aviation_Services_USA_th.jpg',
      },
      {
        title: 'Valencia Airport IPSC SPAIN',
        file: 'Valencia_Airport_IPSC_SPAIN.pdf',
        thumb: 'Valencia_Airport_IPSC_SPAIN_th.jpg',
      },
      {
        title: 'Vreugdenhil Berging NETHELANDS',
        file: 'Vreugdenhil_Berging_NETHELANDS.pdf',
        thumb: 'Vreugdenhil_Berging_NETHELANDS_th.jpg',
      },
      {
        title: 'Wallenius Wilhelmsen Logistics NEDERLAND',
        file: 'Wallenius_Wilhelmsen_Logistics_NEDERLAND.pdf',
        thumb: 'Wallenius_Wilhelmsen_Logistics_NEDERLAND_th.jpg',
      },
      {
        title: 'Wentworth Carrying ConnectPlus NEW ZEALAND',
        file: 'Wentworth_Carrying_ConnectPlus_NEW_ZEALAND.pdf',
        thumb: 'Wentworth_Carrying_ConnectPlus_NEW_ZEALAND_th.jpg',
      },
      {
        title: 'Wiltshire EventsCrew UK',
        file: 'Wiltshire_EventsCrew_UK.pdf',
        thumb: 'Wiltshire_EventsCrew_UK_th.jpg',
      },
      {
        title: 'Wloclawek Municipal Transport POLAND',
        file: 'Wloclawek_Municipal_Transport_POLAND.pdf',
        thumb: 'Wloclawek_Municipal_Transport_POLAND_th.jpg',
      },
      {
        title: 'Yangzhou Taizhou Airport CHINA',
        file: 'Yangzhou_Taizhou_Airport_CHINA.pdf',
        thumb: 'Yangzhou_Taizhou_Airport_CHINA_th.jpg',
      },
    ],
  },
  {
    label: 'Verejné služby',
    slug: 'verejne-sluzby',
    items: [
      {
        title: 'Basildon District Council UK',
        file: 'Basildon_District_Council_UK.pdf',
        thumb: 'Basildon_District_Council_UK_th.jpg',
      },
      {
        title: 'Basingstoke and Deane Borough Council UK',
        file: 'Basingstoke_and_Deane_Borough_Council_UK.pdf',
        thumb: 'Basingstoke_and_Deane_Borough_Council_UK_th.jpg',
      },
      {
        title: 'City of Madison IMPRES USA',
        file: 'City_of_Madison_IMPRES_USA.pdf',
        thumb: 'City_of_Madison_IMPRES_USA_th.jpg',
      },
      {
        title: 'G8 Summit ITALY',
        file: 'G8_Summit_ITALY.pdf',
        thumb: 'G8_Summit_ITALY_th.jpg',
      },
      {
        title: 'San Luis Obispo County Wave USA',
        file: 'San_Luis_Obispo_County_Wave_USA.pdf',
        thumb: 'San_Luis_Obispo_County_Wave_USA_th.jpg',
      },
    ],
  },
];

export const caseStudiesTotal = caseStudies.reduce((n, c) => n + c.items.length, 0);
