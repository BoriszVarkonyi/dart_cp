from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response

from ..models import *
from ..serializers import *

from backend.issues import *
# TODO: use the imported issues_list for human human_readable_issue names

class Statistics(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, competition):

        #Get all fencers
        fencers = FencerModel.objects.filter(competitions=competition)
        fencernum = fencers.count()

        all_issues = WeaponControlModel.objects.filter(competitions=competition)
        serializer = WeaponControlSerializer(all_issues, many=True)


        #Get total issues
        counter = 0

        for x in serializer.data:
            ycount = 0
            for key,value in x.items():
                if key == "notes":
                    continue 
                if ycount > 1:
                    if value == None:
                        continue
                    counter += value
                ycount += 1

        #Get total countries

        countries = []

        fser = FencerSerializer(fencers, many=True)

        for x in fser.data:
            print(x['nation'])
            if x['nation'] in countries:
                print("MARBENNE")
            else:
                countries.append(x['nation'])

        count = len(countries)

        #Get total ratio
        if fencernum == 0:
            total_ratio = "Not enough data"
        else:
            total_ratio =  round(counter / fencernum, 2)

        #Get most/least common issues

        Issues_Dict = {}

        for x in serializer.data:
            ycount = 0
            for key, value in x.items():
                if ycount > 1:
                    realname = WeaponControlModel._meta.get_field(key).verbose_name
                    if key == "notes":
                        continue
                    if realname in Issues_Dict:
                        Issues_Dict[realname] += value
                    else:
                        Issues_Dict[realname] = value
                ycount += 1

        sorted_issues = dict(sorted(Issues_Dict.items(), key=lambda x:x[1], reverse=True))

        if sorted_issues == {}:
            most_issue_name = "Not enough data"
            most_issue_value = "Not enough data"

            least_issue_name = "Not enough data"
            least_issue_value = "Not enough data"
        else:
            most_issue_name = list(sorted_issues.keys())[0]
            most_issue_value = list(sorted_issues.values())[0]

            least_issue_name = list(sorted_issues.keys())[-1]
            least_issue_value = list(sorted_issues.values())[-1]

        #Get most/least issues & ratio

        n_r_dict = {}

        for z in countries:
            n_r_dict[z] = {}

        for x in fser.data:
            for y in serializer.data:
                f_id = x['id']
                if y['fencers'] == f_id:
                    ccount = 0
                    issue_count = 0
                    for key,value in y.items():
                        if ccount > 1:
                            if key == "notes":
                                continue
                            issue_count += value
                        ccount += 1
                    if n_r_dict[x['nation']] == {}:
                        n_r_dict[x['nation']] = {'fencer_num':1, 'issue_num':issue_count}
                    else:
                        n_r_dict[x['nation']]['fencer_num'] += 1
                        n_r_dict[x['nation']]['issue_num'] += issue_count

        real_n_r = []

        for key,value in n_r_dict.items():
            if value != {}:
                ratio = round(value['issue_num'] / value['fencer_num'], 2)
                real_n_r.append({'nation':key,'fencer_num':value['fencer_num'],'issue_num':value['issue_num'],'ratio':ratio})


        if len(serializer.data) == 0:
            return(Response("Not a valid competition or no weapon control record added"))
        else:
            return(Response({'total_issues':counter, 'total_fencers':fencernum, 'total_nation':count, 'total_ratio':total_ratio, 'most_issue':{'type':most_issue_name, 'value': most_issue_value}, 'least_issue':{'type': least_issue_name, 'value': least_issue_value}, 'n_r':real_n_r}))


class StatisticsGetByNations(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, competition):

        # get comp id from url
        comp_id = competition

        # data from db
        queryset = WeaponControlModel.objects.filter( competitions=comp_id, )
        serializer = WeaponControlNationSerializer(queryset, many=True)

        # generate return list
        return_list = dict()

        # generate issues list
        issues_list = [
                'issue_1',
                'issue_2',
                'issue_3',
                'issue_4',
                'issue_5',
                'issue_6',
                'issue_7',
                'issue_8',
                'issue_9',
                'issue_10',
                'issue_11',
                'issue_12',
                'issue_13',
                'issue_14',
                'issue_15',
                'issue_16',
                'issue_17',
                'issue_18',
                'issue_19',
                'issue_20',
                'issue_21',
                'issue_22',
                'issue_23',
                'issue_24',
                'issue_25',
                'issue_26',
                'issue_27',
                'issue_28',
                'issue_29',
                'issue_30',
                'issue_31',
                'issue_32',
                'issue_33',
                'issue_34',
                'issue_35',
            ]

        # loop through all issues of the competition and add the issues to the return list
        for weapon_control_data in serializer.data:
            nation = weapon_control_data['fencers']['nation']
            # get sums of issues
            sums_of_issues = 0
            for issue_id in issues_list:
                sums_of_issues += weapon_control_data[issue_id]

            if (nation not in return_list):
                return_list[nation] = 0

            return_list[nation] += sums_of_issues

        edited_return_list = []
        # Edit return list to make it array of objects
        for nation in return_list:
            # make the objects
            obj = dict()
            issues_obj = return_list[nation]
            obj['fencer_nation'] = nation
            obj['issues'] = issues_obj
            edited_return_list.append(obj)

        # Return the edited_return list
        return Response(edited_return_list)


class StatisticsGetByNationsByIssue(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, competition):

        # get comp id from url
        comp_id = competition

        # data from db
        queryset = WeaponControlModel.objects.filter( competitions=comp_id, )
        serializer = WeaponControlNationSerializer(queryset, many=True)

        # generate return list
        list_return = dict()

        # generate issues list
        issues_list = {
            "issue_1" : "Jacket: Missing FIE mark",
            "issue_2" : "Jacket: Incorrent name printing",
            "issue_3" : "Breeches: Missing FIE mark",
            "issue_4" : "Breeches: Incorrect logo printing",
            "issue_5" : "Plastron: Missing FIE mark",
            "issue_6" : "Plastron: Bad condition",
            "issue_7" : "Electric jacket: Bad condition",
            "issue_8" : "Electric jacket: Incorrect name printing",
            "issue_9" : "Electric jacket: High resistance",
            "issue_10" : "Mask: Missing FIE mark",
            "issue_11" : "Mask: Bad condition",
            "issue_12" : "Mask: Incorrect printing",
            "issue_13" : "Mask/overlay: High resistance",
            "issue_14" : "Glove: Missing FIE mark",
            "issue_15" : "Glove: Bad condition",
            "issue_16" : "Glove/Overlay: Resistance",
            "issue_17" : "Overlay: Condition",
            "issue_18" : "Bodywire: Bad condition",
            "issue_19" : "Bodywire: High resistance",
            "issue_20" : "Maskwire: Bad condition",
            "issue_21" : "Maskwire: High resistance",
            "issue_22" : "Weapon: Missing FIE mark",
            "issue_23" : "Weapon: Too flexible blade",
            "issue_24" : "Weapon: Too sharp blade",
            "issue_25" : "Weapon: Blade too curved",
            "issue_26" : "Weapon: Blade too long",
            "issue_27" : "Weapon: Grip too long",
            "issue_28" : "Weapon: Missing screw",
            "issue_29" : "Weapon: Point weight",
            "issue_30" : "Weapon: Point gauge",
            "issue_31" : "Weapon: Bad guard condition",
            "issue_32" : "Weapon: Incorrect grip angle",
            "issue_33" : "Weapon: Missing insulation",
            "issue_34" : "Weapon: Missing pad",
            "issue_35" : "Other issue",
        }

        for weapon_control_data in serializer.data:
            nation = weapon_control_data['fencers']['nation']
            # make issues obj
            list_issues = dict()

            for issue_id in issues_list:
                human_readable_issue = issues_list[issue_id]
                list_issues[human_readable_issue] = weapon_control_data[issue_id]

            if (nation not in list_return):
                list_return[nation] = dict()
                for issue_id in issues_list:
                    human_readable_issue = issues_list[issue_id]
                    list_return[nation][human_readable_issue] = 0

            for issue_id in issues_list:
                human_readable_issue = issues_list[issue_id]
                list_return[nation][human_readable_issue] += list_issues[human_readable_issue]

        edited_list_return = []
        # Edit return list to make it array of objects
        for nation in list_return:
            # make the objects
            obj = dict()
            #make issues_obj
            issues_list = []
            for hr_issue in list_return[nation]:
                issue_value = list_return[nation][hr_issue]
                issue_obj = dict()
                issue_obj['value'] = issue_value
                issue_obj['issue_human_readable_name'] = hr_issue
                issues_list.append(issue_obj)

            obj['fencer_nation'] = nation
            obj['issues'] = issues_list
            edited_list_return.append(obj)

        return Response(edited_list_return)


class StatisticsGetByIssues(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, competition):

        # get comp id from url
        comp_id = competition

        # data from db
        queryset = WeaponControlModel.objects.filter( competitions=comp_id, )
        serializer = WeaponControlNationSerializer(queryset, many=True)

        # generate return list
        list_return = dict()

        issues_list = {
            "issue_1" : "Jacket: Missing FIE mark",
            "issue_2" : "Jacket: Incorrent name printing",
            "issue_3" : "Breeches: Missing FIE mark",
            "issue_4" : "Breeches: Incorrect logo printing",
            "issue_5" : "Plastron: Missing FIE mark",
            "issue_6" : "Plastron: Bad condition",
            "issue_7" : "Electric jacket: Bad condition",
            "issue_8" : "Electric jacket: Incorrect name printing",
            "issue_9" : "Electric jacket: High resistance",
            "issue_10" : "Mask: Missing FIE mark",
            "issue_11" : "Mask: Bad condition",
            "issue_12" : "Mask: Incorrect printing",
            "issue_13" : "Mask/overlay: High resistance",
            "issue_14" : "Glove: Missing FIE mark",
            "issue_15" : "Glove: Bad condition",
            "issue_16" : "Glove/Overlay: Resistance",
            "issue_17" : "Overlay: Condition",
            "issue_18" : "Bodywire: Bad condition",
            "issue_19" : "Bodywire: High resistance",
            "issue_20" : "Maskwire: Bad condition",
            "issue_21" : "Maskwire: High resistance",
            "issue_22" : "Weapon: Missing FIE mark",
            "issue_23" : "Weapon: Too flexible blade",
            "issue_24" : "Weapon: Too sharp blade",
            "issue_25" : "Weapon: Blade too curved",
            "issue_26" : "Weapon: Blade too long",
            "issue_27" : "Weapon: Grip too long",
            "issue_28" : "Weapon: Missing screw",
            "issue_29" : "Weapon: Point weight",
            "issue_30" : "Weapon: Point gauge",
            "issue_31" : "Weapon: Bad guard condition",
            "issue_32" : "Weapon: Incorrect grip angle",
            "issue_33" : "Weapon: Missing insulation",
            "issue_34" : "Weapon: Missing pad",
            "issue_35" : "Other issue",
        }

        for issue_id in issues_list:
            human_readable_issue = issues_list[issue_id]
            list_return[human_readable_issue] = 0

        # loop through all issues of the competition and add the issues to the return list
        for weapon_control_data in serializer.data:
            nation = weapon_control_data['fencers']['nation']
            # get sums of issues

            for issue_id in issues_list:
                human_readable_issue = issues_list[issue_id]
                list_return[human_readable_issue] += weapon_control_data[issue_id]

        edited_list_return = []
        # Edit return list to make it array of objects
        for nation in list_return:
            # make the objects
            obj = dict()
            issues_obj = list_return[nation]
            obj['issue_human_readable_name'] = nation
            obj['issues'] = issues_obj
            edited_list_return.append(obj)

        return Response(edited_list_return)

