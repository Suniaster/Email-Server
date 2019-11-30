#!/usr/bin/env bash
echo "Mandando email..."
sudo echo "Teste email" | mail -s "Testando email\n Testando" localhost@suniaster
echo "Email enviado!"