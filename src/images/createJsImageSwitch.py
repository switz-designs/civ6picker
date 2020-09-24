import os

LEADER_FILE = "D:\GitHub Projects\civ6pickerwebapp\webapi\data\leaders.txt"
IMAGE_FILE_LIST = os.listdir("D:\GitHub Projects\civ6pickerwebapp\webapp\src\images\leadericons")


def import_list_from_file(filename):
    with open(filename, encoding="utf-8") as f:
        file_list = [line.rstrip() for line in f]
    return file_list


def populate_leaders(file_text):
    new_file_text = file_text
    leader_list = import_list_from_file(LEADER_FILE)
    for index, leader in enumerate(leader_list):
        new_file_text = f"{new_file_text}" \
                        f"        case \'{leader}\':\n" \
                        f"            return require(\'./images/leadericons/{IMAGE_FILE_LIST[index]}\');\n"
    return new_file_text


def main():
    file_text = "export function getLeaderImage(leader) {\n" \
                "    switch(leader) {\n"
    new_file_text = populate_leaders(file_text)
    new_file_text = new_file_text + "    }\n}"
    print(new_file_text)


main()