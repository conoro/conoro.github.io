Unfortunately, just like 0.12.0, the 0.12.1 release of Node won't compile on Raspberry Pi (pre 2) so I took a patch from [io.js](http://iojs.org) and was able to build it.

![Node.js](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2015/02/nodejs.jpg)

The problem is due to recent releases of Raspbian mis-identifying the ARM version so Node tries to build for V7 instead of V6. These [two](https://github.com/bnoordhuis/io.js/commit/6f7494292e22b1f1050abeaa43f257ac466edf2b) [changes](https://github.com/bnoordhuis/io.js/commit/8afcc5e701538e5a442a0334d781eac202cc4e1d) from this [io.js thread](https://github.com/iojs/io.js/issues/283) sort it out.

I set the Raspberry Pi B+ to Turbo mode and it took 4ish hours to build

[Download here](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2015/03/node-v0.12.1-linux-arm-pi.tar.gz) and enjoy.

```javascript
wget https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2015/03/node-v0.12.1-linux-arm-pi.tar.gz
tar -zxvf node-v0.12.1-linux-arm-pi.tar.gz
cd node-v0.12.1-linux-arm-pi
sudo cp -R * /usr/local/
```

Updated files:
* [configure](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2015/03/configure)
* [cpu.cc](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2015/03/cpu.cc)

Diffs:
* configure

```diff
493a494,495
>     o['variables']['arm_fpu'] = 'vfpv3'
>     o['variables']['arm_neon'] = int(is_arm_neon())
495,496d496
<   elif is_arch_armv6():
<     o['variables']['arm_version'] = '6'
498c498,500
<     o['variables']['arm_version'] = 'default'
---
>     o['variables']['arm_fpu'] = 'vfpv2'
>     o['variables']['arm_neon'] = 0
>     o['variables']['arm_version'] = '6' if is_arch_armv6() else 'default'
500,501d501
<   o['variables']['arm_fpu'] = 'vfpv3'  # V8 3.18 no longer supports VFP2.
<   o['variables']['arm_neon'] = int(is_arm_neon())
```

* cpu.cc

```diff
368c368
<     // We try to correct this by looking at the 'elf_platform'
---
>     // We try to correct this by looking at the 'elf_format'
374c374
<       char* processor = cpu_info.ExtractField("model name");
---
>       char* processor = cpu_info.ExtractField("Processor");
```

* Make Test Output: [25:08|% 100|+ 775|-   6]: Done
(failures seem to be timeouts mainly)
