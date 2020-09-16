# This file will hold all processes that will be used to train model.
# in my case, I use `darknet` then I will setup data and call to darknet binary (external application)

import argparse
import os
import subprocess
import shutil

def loadPretrainedModel():
    print('loadPretrainedModel')
    # update config file for next training
    # increase max batches for next training - default = 45000 for first training
    reading_file = open("Model/yolo-obj.cfg", "r")

    new_file_content = ""
    for line in reading_file:
        if "max_batches" in line:
            stripped_line = line.strip()
            new_line = stripped_line.replace("max_batches", "")
            new_line = new_line.replace("=", "")
            new_line = new_line.strip()
            batches = int(new_line)
            if batches < 45000:
                batches = 45000
            else:
                batches = batches + 45000
            new_line = 'max_batches = ' + str(batches)
            new_file_content += new_line +"\n"
        else:
            new_file_content += line
    reading_file.close()

    writing_file = open("Model/yolo-obj-new.cfg", "w")
    writing_file.write(new_file_content)
    writing_file.close()

    # copy config file and last trained model to training folder
    src = '/home/ubuntu/ChauNNT/AI_ID_Card/Applications/CCCD_Card_Detector/LearningCell/Model/'
    dest = '/home/ubuntu/ChauNNT/darknet/'
    src_files = os.listdir(src)
    for file_name in src_files:
        full_file_name = os.path.join(src, file_name)
        if os.path.isfile(full_file_name):
            shutil.copy(full_file_name, dest)

    cmd = 'mv -f /home/ubuntu/ChauNNT/darknet/yolo-obj-new.cfg /home/ubuntu/ChauNNT/darknet/yolo-obj.cfg -v'.split()
    subprocess.call(cmd)

def prepareTrainingData():
    print('prepareTrainingData')
    # copy all training data to training ground
    # Because i use darknet then copy files to darknet folder
    src = '/home/ubuntu/ChauNNT/AI_ID_Card/Applications/CCCD_Card_Detector/LearningCell/LearningData/'
    dest = '/home/ubuntu/ChauNNT/darknet/'
    src_files = os.listdir(src)
    for file_name in src_files:
        full_file_name = os.path.join(src, file_name)
        if os.path.isfile(full_file_name):
            shutil.copy(full_file_name, dest)

    # cleanup result of last training
    cmd = 'rm -rf /home/ubuntu/ChauNNT/darknet/backup/*'.split()
    subprocess.call(cmd)

def train():
    print('train')
    os.chdir('/home/ubuntu/ChauNNT/darknet')
    cmd = '/home/ubuntu/ChauNNT/darknet/darknet detector train /home/ubuntu/ChauNNT/darknet/data/obj.data /home/ubuntu/ChauNNT/darknet/yolo-obj.cfg /home/ubuntu/ChauNNT/darknet/yolo-obj.weights -dont_show'.split()
    subprocess.call(cmd)


def main(args):
    # Load pretrained model from 'Model'
    loadPretrainedModel()

    # prepare training data
    prepareTrainingData()

    # train with data from 'LearningData'
    train()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    main(parser.parse_args())
