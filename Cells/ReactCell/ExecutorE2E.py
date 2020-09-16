from Executor import Executor

import argparse

def main(args):
    executor = Executor()
    executor.execute(args.file)
    return

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-f',
                        '--file',
                        type=str,
                        help='Path to Images File.',
                        required=True)
    main(parser.parse_args())
