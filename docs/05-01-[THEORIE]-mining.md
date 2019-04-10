# :mortar_board: THEORIE: _Mining_

## Cryptocurrencies "verbrennen" Rechenleistung in gigantischem Ausmaß für _Proof-of-Work (PoW)_

## Mining ist absichtlich ineffizient, um Angriffe auf das Netzwerk teuer zu machen!

## Mining früher:
- Nerds lassen nebenbei ihr Notebook minen
- Wettbewerb beginnt: optimierte Mining-Software für GPUs ist um Größenordnungen effizienter

## Mining heute:

### ASICs haben CPUs und GPUs verdrängt

Beispiel Bitmain Antminer S9
- 14 TH/s
- 189 Chips
- 1.5 kW elektrische Leistung

![](./pics/antminer-s9.jpg)

Innenansicht:
![](./pics/antminer-s9-inside.jpg)

3 dicht gepackte Boards mit ASICs:
![](./pics/antminer-s9-board.jpg)

### Mining im industriellen Maßstab

![](./pics/mining-farm.jpg)

## Manche Cryptocurrencies wehren sich gegen ASICs

- Ethereum: PoW-Algorithmus Ethash ist Memory-hard = gut für GPU-Mining
- Monero: regelmäßige Hardforks mit Änderung des PoW-Algorithmus (Cryptonight)

Ständiges Katz-und-Maus-Spiel zwischen ASIC-Herstellern und Entwicklern

## Pool-Mining
- Solo-Mining in der Regel aussichtslos
- Mining in einem Pool
  - zentraler Koordinator verteilt Teilaufgaben
  - Miner werden entlohnt für ihre erledigten Aufgaben