import os

for filename in os.listdir("./"):
    old_filename = filename
    new_filename_split = old_filename.split("_(Civ6)")
    # print(new_filename_split)
    if len(new_filename_split) > 1:
        print (new_filename_split[0] + new_filename_split[1])
        new_filename = new_filename_split[0] + new_filename_split[1]
        os.rename(old_filename, new_filename)

