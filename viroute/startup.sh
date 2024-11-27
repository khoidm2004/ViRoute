#!/bin/bash
gunicorn --workers=3 viroute.wsgi:application