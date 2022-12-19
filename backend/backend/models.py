from django.db import models

SEX_CHOICE = [
    ("M", "Male"),
    ("F", "Female"),
    ("X", "Mix"),
]
WEAPON_CHOICE = [
    ("E", "Epee"),
    ("F", "Foil"),
    ("S", "Sabre"),
]
LATERALITE_CHOICE = [
    ("D", "Droit"),
    ("G", "Gauche"),
]
NATION_CHOICE = [ 
    ("AFG", "Afghanistan"),
    ("ALA", "Åland Islands"),
    ("ALB", "Albania"),
    ("DZA", "Algeria"),
    ("ASM", "American Samoa"),
    ("AND", "Andorra"),
    ("AGO", "Angola"),
    ("AIA", "Anguilla"),
    ("ATA", "Antarctica"),
    ("ATG", "Antigua and Barbuda"),
    ("ARG", "Argentina"),
    ("ARM", "Armenia"),
    ("ABW", "Aruba"),
    ("AUS", "Australia"),
    ("AUT", "Austria"),
    ("AZE", "Azerbaijan"),
    ("BHS", "Bahamas"),
    ("BHR", "Bahrain"),
    ("BGD", "Bangladesh"),
    ("BRB", "Barbados"),
    ("BLR", "Belarus"),
    ("BEL", "Belgium"),
    ("BLZ", "Belize"),
    ("BEN", "Benin"),
    ("BMU", "Bermuda"),
    ("BTN", "Bhutan"),
    ("BOL", "Bolivia, Plurinational State of"),
    ("BES", "Bonaire, Sint Eustatius and Saba"),
    ("BIH", "Bosnia and Herzegovina"),
    ("BWA", "Botswana"),
    ("BVT", "Bouvet Island"),
    ("BRA", "Brazil"),
    ("IOT", "British Indian Ocean Territory"),
    ("BRN", "Brunei Darussalam"),
    ("BGR", "Bulgaria"),
    ("BFA", "Burkina Faso"),
    ("BDI", "Burundi"),
    ("KHM", "Cambodia"),
    ("CMR", "Cameroon"),
    ("CAN", "Canada"),
    ("CPV", "Cape Verde"),
    ("CYM", "Cayman Islands"),
    ("CAF", "Central African Republic"),
    ("TCD", "Chad"),
    ("CHL", "Chile"),
    ("CHN", "China"),
    ("CXR", "Christmas Island"),
    ("CCK", "Cocos (Keeling) Islands"),
    ("COL", "Colombia"),
    ("COM", "Comoros"),
    ("COG", "Congo"),
    ("COD", "Congo, the Democratic Republic of the"),
    ("COK", "Cook Islands"),
    ("CRI", "Costa Rica"),
    ("CIV", "Côte d'Ivoire"),
    ("HRV", "Croatia"),
    ("CUB", "Cuba"),
    ("CUW", "Curaçao"),
    ("CYP", "Cyprus"),
    ("CZE", "Czech Republic"),
    ("DNK", "Denmark"),
    ("DJI", "Djibouti"),
    ("DMA", "Dominica"),
    ("DOM", "Dominican Republic"),
    ("ECU", "Ecuador"),
    ("EGY", "Egypt"),
    ("SLV", "El Salvador"),
    ("GNQ", "Equatorial Guinea"),
    ("ERI", "Eritrea"),
    ("EST", "Estonia"),
    ("ETH", "Ethiopia"),
    ("FLK", "Falkland Islands (Malvinas)"),
    ("FRO", "Faroe Islands"),
    ("FJI", "Fiji"),
    ("FIN", "Finland"),
    ("FRA", "France"),
    ("GUF", "French Guiana"),
    ("PYF", "French Polynesia"),
    ("ATF", "French Southern Territories"),
    ("GAB", "Gabon"),
    ("GMB", "Gambia"),
    ("GEO", "Georgia"),
    ("DEU", "Germany"),
    ("GHA", "Ghana"),
    ("GIB", "Gibraltar"),
    ("GRC", "Greece"),
    ("GRL", "Greenland"),
    ("GRD", "Grenada"),
    ("GLP", "Guadeloupe"),
    ("GUM", "Guam"),
    ("GTM", "Guatemala"),
    ("GGY", "Guernsey"),
    ("GIN", "Guinea"),
    ("GNB", "Guinea-Bissau"),
    ("GUY", "Guyana"),
    ("HTI", "Haiti"),
    ("HMD", "Heard Island and McDonald Islands"),
    ("VAT", "Holy See (Vatican City State)"),
    ("HND", "Honduras"),
    ("HKG", "Hong Kong"),
    ("HUN", "Hungary"),
    ("ISL", "Iceland"),
    ("IND", "India"),
    ("IDN", "Indonesia"),
    ("IRN", "Iran, Islamic Republic of"),
    ("IRQ", "Iraq"),
    ("IRL", "Ireland"),
    ("IMN", "Isle of Man"),
    ("ISR", "Israel"),
    ("ITA", "Italy"),
    ("JAM", "Jamaica"),
    ("JPN", "Japan"),
    ("JEY", "Jersey"),
    ("JOR", "Jordan"),
    ("KAZ", "Kazakhstan"),
    ("KEN", "Kenya"),
    ("KIR", "Kiribati"),
    ("PRK", "Korea, Democratic People's Republic of"),
    ("KOR", "Korea, Republic of"),
    ("KWT", "Kuwait"),
    ("KGZ", "Kyrgyzstan"),
    ("LAO", "Lao People's Democratic Republic"),
    ("LVA", "Latvia"),
    ("LBN", "Lebanon"),
    ("LSO", "Lesotho"),
    ("LBR", "Liberia"),
    ("LBY", "Libya"),
    ("LIE", "Liechtenstein"),
    ("LTU", "Lithuania"),
    ("LUX", "Luxembourg"),
    ("MAC", "Macao"),
    ("MKD", "Macedonia, the former Yugoslav Republic of"),
    ("MDG", "Madagascar"),
    ("MWI", "Malawi"),
    ("MYS", "Malaysia"),
    ("MDV", "Maldives"),
    ("MLI", "Mali"),
    ("MLT", "Malta"),
    ("MHL", "Marshall Islands"),
    ("MTQ", "Martinique"),
    ("MRT", "Mauritania"),
    ("MUS", "Mauritius"),
    ("MYT", "Mayotte"),
    ("MEX", "Mexico"),
    ("FSM", "Micronesia, Federated States of"),
    ("MDA", "Moldova, Republic of"),
    ("MCO", "Monaco"),
    ("MNG", "Mongolia"),
    ("MNE", "Montenegro"),
    ("MSR", "Montserrat"),
    ("MAR", "Morocco"),
    ("MOZ", "Mozambique"),
    ("MMR", "Myanmar"),
    ("NAM", "Namibia"),
    ("NRU", "Nauru"),
    ("NPL", "Nepal"),
    ("NLD", "Netherlands"),
    ("NCL", "New Caledonia"),
    ("NZL", "New Zealand"),
    ("NIC", "Nicaragua"),
    ("NER", "Niger"),
    ("NGA", "Nigeria"),
    ("NIU", "Niue"),
    ("NFK", "Norfolk Island"),
    ("MNP", "Northern Mariana Islands"),
    ("NOR", "Norway"),
    ("OMN", "Oman"),
    ("PAK", "Pakistan"),
    ("PLW", "Palau"),
    ("PSE", "Palestinian Territory, Occupied"),
    ("PAN", "Panama"),
    ("PNG", "Papua New Guinea"),
    ("PRY", "Paraguay"),
    ("PER", "Peru"),
    ("PHL", "Philippines"),
    ("PCN", "Pitcairn"),
    ("POL", "Poland"),
    ("PRT", "Portugal"),
    ("PRI", "Puerto Rico"),
    ("QAT", "Qatar"),
    ("REU", "Réunion"),
    ("ROU", "Romania"),
    ("RUS", "Russian Federation"),
    ("RWA", "Rwanda"),
    ("BLM", "Saint Barthélemy"),
    ("SHN", "Saint Helena, Ascension and Tristan da Cunha"),
    ("KNA", "Saint Kitts and Nevis"),
    ("LCA", "Saint Lucia"),
    ("MAF", "Saint Martin (French part)"),
    ("SPM", "Saint Pierre and Miquelon"),
    ("VCT", "Saint Vincent and the Grenadines"),
    ("WSM", "Samoa"),
    ("SMR", "San Marino"),
    ("STP", "Sao Tome and Principe"),
    ("SAU", "Saudi Arabia"),
    ("SEN", "Senegal"),
    ("SRB", "Serbia"),
    ("SYC", "Seychelles"),
    ("SLE", "Sierra Leone"),
    ("SGP", "Singapore"),
    ("SXM", "Sint Maarten (Dutch part)"),
    ("SVK", "Slovakia"),
    ("SVN", "Slovenia"),
    ("SLB", "Solomon Islands"),
    ("SOM", "Somalia"),
    ("ZAF", "South Africa"),
    ("SGS", "South Georgia and the South Sandwich Islands"),
    ("SSD", "South Sudan"),
    ("ESP", "Spain"),
    ("LKA", "Sri Lanka"),
    ("SDN", "Sudan"),
    ("SUR", "Suriname"),
    ("SJM", "Svalbard and Jan Mayen"),
    ("SWZ", "Swaziland"),
    ("SWE", "Sweden"),
    ("CHE", "Switzerland"),
    ("SYR", "Syrian Arab Republic"),
    ("TWN", "Taiwan, Province of China"),
    ("TJK", "Tajikistan"),
    ("TZA", "Tanzania, United Republic of"),
    ("THA", "Thailand"),
    ("TLS", "Timor-Leste"),
    ("TGO", "Togo"),
    ("TKL", "Tokelau"),
    ("TON", "Tonga"),
    ("TTO", "Trinidad and Tobago"),
    ("TUN", "Tunisia"),
    ("TUR", "Turkey"),
    ("TKM", "Turkmenistan"),
    ("TCA", "Turks and Caicos Islands"),
    ("TUV", "Tuvalu"),
    ("UGA", "Uganda"),
    ("UKR", "Ukraine"),
    ("ARE", "United Arab Emirates"),
    ("GBR", "United Kingdom"),
    ("USA", "United States"),
    ("UMI", "United States Minor Outlying Islands"),
    ("URY", "Uruguay"),
    ("UZB", "Uzbekistan"),
    ("VUT", "Vanuatu"),
    ("VEN", "Venezuela, Bolivarian Republic of"),
    ("VNM", "Viet Nam"),
    ("VGB", "Virgin Islands, British"),
    ("VIR", "Virgin Islands, U.S."),
    ("WLF", "Wallis and Futuna"),
    ("ESH", "Western Sahara"),
    ("YEM", "Yemen"),
    ("ZMB", "Zambia"),
    ("ZWE", "Zimbabwe"),
]
COMPETITION_TYPE_CHOICE = [
    ("I", "Individual"),
    ("T", "Team"),
]

class TournamentModel(models.Model):
    title_long = models.CharField(max_length=12)
    starting_date = models.DateField()
    ending_date = models.DateField()

class CompetitionModel(models.Model):
    assoc_tournament_id = models.ForeignKey(TournamentModel, on_delete=models.CASCADE)
    title_long = models.CharField(max_length=72)
    weapon_type = models.CharField(max_length=1, choices=WEAPON_CHOICE)
    is_wheelchair = models.BooleanField(default=False)
    sex = models.CharField(max_length=1, choices=SEX_CHOICE)
    type = models.CharField(max_length=1, choices=COMPETITION_TYPE_CHOICE)
    age_group = models.CharField(max_length=64)
    host_country = models.CharField(max_length=3, choices=NATION_CHOICE)
    address = models.CharField(max_length=128)
    entry_fee = models.IntegerField()
    currency = models.CharField(max_length=32) #coice for money
    start_date = models.DateField()
    end_date = models.DateField()

class FencerModel(models.Model):
    id = models.CharField(max_length=24,primary_key=True) # will be generated from FencerModel.nom + FencerModel.pre_nom + FencerModel.date_naissance
    competitions = models.ManyToManyField(CompetitionModel)
    nom = models.CharField(max_length=72)
    pre_nom = models.CharField(max_length=72)
    sexe = models.CharField(max_length=1, choices=SEX_CHOICE)
    lateralite = models.CharField(max_length=1, choices=LATERALITE_CHOICE)
    nation = models.CharField(max_length=3, choices=NATION_CHOICE)
    club = models.CharField(max_length=256)
    licence = models.CharField(max_length=12)
    statut = models.CharField(max_length=1)
    date_naissance = models.DateField()
    classement = models.IntegerField()
    points = models.IntegerField()
    barcode = models.IntegerField()
    registration_status = models.BooleanField(default=False)

class WeaponControlModel(models.Model):
    assoc_fencer_id = models.ForeignKey(FencerModel, on_delete=models.CASCADE)
    assoc_competition_id = models.ForeignKey(CompetitionModel, on_delete=models.CASCADE)

    #issues
    issue_1 = models.SmallIntegerField(max_length=1, verbose_name="FIE mark on blade")
    issue_2 = models.SmallIntegerField(max_length=1, verbose_name="Arm gap and weight")
    issue_3 = models.SmallIntegerField(max_length=1, verbose_name="Arm length")
    issue_4 = models.SmallIntegerField(max_length=1, verbose_name="Blade length")
    issue_5 = models.SmallIntegerField(max_length=1, verbose_name="Grip length")
    issue_6 = models.SmallIntegerField(max_length=1, verbose_name="Form and depth of the guard")
    issue_7 = models.SmallIntegerField(max_length=1, verbose_name="Guard oxydation/ deformation")
    issue_8 = models.SmallIntegerField(max_length=1, verbose_name="Excentricity of the blade")
    issue_9 = models.SmallIntegerField(max_length=1, verbose_name="Blade flexibility")
    issue_10 = models.SmallIntegerField(max_length=1, verbose_name="Curve on the blade")
    issue_11 = models.SmallIntegerField(max_length=1, verbose_name="Foucault current device")
    issue_12 = models.SmallIntegerField(max_length=1, verbose_name="Point and arm size")
    issue_13 = models.SmallIntegerField(max_length=1, verbose_name="Lenght/ condition of body/ mask wire")
    issue_14 = models.SmallIntegerField(max_length=1, verbose_name="Resistance of body/ mask wire")
    issue_15 = models.SmallIntegerField(max_length=1, verbose_name="Mask: FIE mark")
    issue_16 = models.SmallIntegerField(max_length=1, verbose_name="Mask: condition and insulation")
    issue_17 = models.SmallIntegerField(max_length=1, verbose_name="Mask: resistance (sabre/foil)")
    issue_18 = models.SmallIntegerField(max_length=1, verbose_name="Metallic jacket condition")
    issue_19 = models.SmallIntegerField(max_length=1, verbose_name="Metallic jacket resistance")
    issue_20 = models.SmallIntegerField(max_length=1, verbose_name="Sabre/ glove overlay condition")
    issue_21 = models.SmallIntegerField(max_length=1, verbose_name="Sabre glove overlay resistance")
    issue_22 = models.SmallIntegerField(max_length=1, verbose_name="Glove condition")
    issue_23 = models.SmallIntegerField(max_length=1, verbose_name="Foil chest protector")
    issue_24 = models.SmallIntegerField(max_length=1, verbose_name="Socks")
    issue_25 = models.SmallIntegerField(max_length=1, verbose_name="Incorrect name printing")
    issue_26 = models.SmallIntegerField(max_length=1, verbose_name="Incorrect national logo")
    issue_27 = models.SmallIntegerField(max_length=1, verbose_name="Commercial")
    issue_28 = models.SmallIntegerField(max_length=1, verbose_name="Other items")
    #end issues

    notes = models.TextField()

