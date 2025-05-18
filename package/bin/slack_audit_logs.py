import import_declare_test

import sys
import json

from splunklib import modularinput as smi

import os
import traceback
import requests
from splunklib import modularinput as smi
from solnlib import conf_manager
from solnlib import log
from solnlib.modular_input import checkpointer
from splunktaucclib.modinput_wrapper import base_modinput  as base_mi 

import input_module_slack_audit_logs as input_module

bin_dir  = os.path.basename(__file__)
app_name = os.path.basename(os.path.dirname(os.getcwd()))

class ModInputSLACK_AUDIT_LOGS(base_mi.BaseModInput): 

    def __init__(self):
        use_single_instance = False
        super(ModInputSLACK_AUDIT_LOGS, self).__init__(app_name, "slack_audit_logs", use_single_instance) 
        self.global_checkbox_fields = None

    def get_scheme(self):
        scheme = smi.Scheme('slack_audit_logs')
        scheme.description = 'slack_audit_logs'
        scheme.use_external_validation = True
        scheme.streaming_mode_xml = True
        scheme.use_single_instance = False

        scheme.add_argument(
            smi.Argument(
                'name',
                title='Name',
                description='Name',
                required_on_create=True
            )
        )
        scheme.add_argument(
            smi.Argument(
                'start_time',
                required_on_create=True,
            )
        )
        
        scheme.add_argument(
            smi.Argument(
                'account',
                required_on_create=True,
            )
        )
        
        return scheme

    def validate_input(self, definition):
        """validate the input stanza"""
        input_module.validate_input(self, definition)


    def get_app_name(self):
        return app_name

    def collect_events(helper, ew):
        """write out the events"""
        input_module.collect_events(helper, ew)

    def get_account_fields(self):
        account_fields = []
        return account_fields


    def get_checkbox_fields(self):
        checkbox_fields = []
        return checkbox_fields


    def get_global_checkbox_fields(self):
        if self.global_checkbox_fields is None:
            checkbox_name_file = os.path.join(bin_dir, 'global_checkbox_param.json')
            try:
                if os.path.isfile(checkbox_name_file):
                    with open(checkbox_name_file, 'r') as fp:
                        self.global_checkbox_fields = json.load(fp)
                else:
                    self.global_checkbox_fields = []
            except Exception as e:
                self.log_error('Get exception when loading global checkbox parameter names. ' + str(e))
                self.global_checkbox_fields = []
        return self.global_checkbox_fields


if __name__ == '__main__':
    exit_code = ModInputSLACK_AUDIT_LOGS().run(sys.argv)
    sys.exit(exit_code)


