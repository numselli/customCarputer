# sketch_sep14a 
- flashed to Arduino nano
- page 329 of wiring diagram
- common pin of resistor ladder (EAU) to 5v
- mode button (AU2) to A5
- other button (AU1) to a6
- 100k resistor between ground and pin A5
- 100K resistor between ground and pin A6

# dependencies:
- [pactl](https://man.archlinux.org/man/pactl.1)
- [node](https://man.archlinux.org/man/node.1.en)
- [npm](https://archlinux.org/packages/extra/any/npm/)
- [playerctl](https://man.archlinux.org/man/playerctl.1.en)

# permissions: 
- `sudo usermod -a -G uucp <username>`

# stearingWheelControlService
- move `stearingWheelControlService/stearingWheelControlService.desktop` to `/home/user/.config/autostart/`
- `npm i`
- restart
