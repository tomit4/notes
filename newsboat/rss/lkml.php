<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<rss version="2.0">
  <!-- Note to users: this is the RSS2 compliant form of 
lkml.org/rdf.php . See the comments over there too.
-->
  <channel>
    <title>lkml.org</title>
    <link>http://lkml.org</link>
    <description>lkml.org - the realtime linux kernel mailinglist archive</description>
    <lastBuildDate>Fri, 02 Dec 2022 06:27:13 +0100</lastBuildDate>
    <item>
      <title>[PATCH] Revert "cpufreq: mediatek: Refine mtk_cpufreq_voltage_trac ...</title>
      <author>Viresh Kumar &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/2/7</link>
      <description>Viresh Kumar writes: (Summary)  new_vproc) {
+  /*
+   * When scaling up voltages, Vsram and Vproc scale up step
+   * by step.
-   else
+   } else {
+    ret = regulator_set_voltage(sram_reg, vsram,
+           vsram + VOLT_TOL); new_vproc) {
+  /*
+   * When scaling down voltages, Vsram and Vproc scale down step
+   * by step.
+   } else {
+    ret = regulator_set_voltage(sram_reg, vsram,
+           vsram + VOLT_TOL);
</description>
    </item>
    <item>
      <title>Re: [PATCH 0/3] KVM: arm64: Handle CCSIDR associativity mismatches</title>
      <author>Akihiko Odaki &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/2/6</link>
      <description>Akihiko Odaki writes: (Summary) 

On 2022/12/02 8:13, Marc Zyngier wrote:&lt;br/&gt;

different between the two clusters.&lt;br/&gt;
It seems KVM stores a MIDR value of a CPU and reuse it as "invariant" 
value for ioctls while it exposes the MIDR value each physical CPU owns 
to vCPU. This would help 
migrating vCPU among clusters, but if you pin each vCPU thread to a 
distinct phyiscal CPU, you may rather want the vCPU to see the MIDR 
value specific to each physical CPU and to apply quirks or tuning 
parameters according to the value.
</description>
    </item>
    <item>
      <title>Re: [PATCH 2/3] arm64: tegra: Add uphy lane number and intr in p2u ...</title>
      <author>Manikanta Maddireddy &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/2/5</link>
      <description>Manikanta Maddireddy writes: 
On 12/1/2022 3:14 PM, Jon Hunter wrote:&lt;br/&gt;

Ack, I will address in V2.&lt;br/&gt;
Ack, I will address in V2.&lt;br/&gt;
Thanks,&lt;br/&gt;
Manikanta&lt;br/&gt;

Jon&lt;br/&gt;
Jon&lt;br/&gt;
</description>
    </item>
    <item>
      <title>Re: [PATCH v6 3/5] net/tcp: Disable TCP-MD5 static key on tcp_md5s ...</title>
      <author>Eric Dumazet &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/2/4</link>
      <description>Eric Dumazet writes: (Summary) 
Hmm, I missed two kfree_rcu(key) calls, I will send the following fix:
Hmm, I missed two kfree_rcu(key) calls, I will send the following fix:
diff --git a/net/ipv4/tcp_ipv4.c b/net/ipv4/tcp_ipv4.c
index 7fae586405cfb10011a0674289280bf400dfa8d8..8320d0ecb13ae1e3e259f3c13a4c2797fbd984a5
100644
--- a/net/ipv4/tcp_ipv4.c
+++ b/net/ipv4/tcp_ipv4.c
@@ -1245,7 +1245,7 @@ int tcp_md5_do_add(struct sock *sk, const union
tcp_md5_addr *addr,

                        md5sig =
rcu_dereference_protected(tp-&amp;gt;md5sig_info, lockdep_sock_is_held(sk));
                }
        }
@@ -1271,7 +1271,7 @@ int tcp_md5_key_copy(struct sock *sk, const
union tcp_md5_addr *addr,
                        md5sig =
rcu_dereference_protected(tp-&amp;gt;md5sig_info, lockdep_sock_is_held(sk));
</description>
    </item>
    <item>
      <title>Re: [PATCH v2] crypto/caam: Avoid GCC constprop bug warning</title>
      <author>Herbert Xu &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/2/3</link>
      <description>Herbert Xu writes: (Summary) On Thu, Dec 01, 2022 at 07:30:22PM -0800, Kees Cook wrote:

"if (data)", though.  So how about something like this?&lt;br/&gt;
diff --git a/drivers/crypto/caam/desc_constr.h b/drivers/crypto/caam/desc_constr.h
index 62ce6421bb3f..b49c995e1cc6 100644
--- a/drivers/crypto/caam/desc_constr.h
+++ b/drivers/crypto/caam/desc_constr.h
@@ -163,7 +163,7 @@ static inline void append_data(u32 * const desc, const void *data, int len)
 {
  u32 *offset = desc_end(desc);
 
- if (len) /* avoid sparse warning: memcpy with byte count of 0 */
+ if (!IS_ENABLED(CONFIG_CRYPTO_DEV_FSL_CAAM_DEBUG) ||
</description>
    </item>
    <item>
      <title>Re: [PATCH v14 3/8] genirq: Add mechanism to multiplex a single HW IPI</title>
      <author>Anup Patel &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/2/2</link>
      <description>Anup Patel writes: (Summary)  wrote:

wants to see the Acked/Tested-by of the folks who maintain apple-AIC. Only in recent patch revisions (based on
suggestion from Marc Z), I tried to converge and make it useful
for apple-AIC driver as well.
Thanks to Marc Z, we now have a patch for apple-AIC driver as well.
Okay, I will include the apple-AIC patch from Marc Z in the next revision
and add apple-AIC folks in CC.&lt;br/&gt;
and add apple-AIC folks in CC.&lt;br/&gt;

        tglx&lt;br/&gt;
Regards,&lt;br/&gt;
Anup&lt;br/&gt;
Anup&lt;br/&gt;
Anup&lt;br/&gt;

</description>
    </item>
    <item>
      <title>Re: [PATCH V2 02/11] cxl/mem: Implement Get Event Records command</title>
      <author>Steven Rostedt &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/2/1</link>
      <description>Steven Rostedt writes: (Summary)  wrote:&lt;br/&gt;

 #endif /* CREATE_TRACE_POINTS */&lt;br/&gt;
Bah, I want this outside that #ifdef&lt;br/&gt;
Bah, I want this outside that #ifdef&lt;br/&gt;

@@ -6,7 +6,6 @@&lt;br/&gt;
I also don't think I need to touch stage7.&lt;br/&gt;
I also don't think I need to touch stage7.&lt;br/&gt;
New patch:&lt;br/&gt;
New patch:&lt;br/&gt;
diff --git a/include/trace/define_trace.h b/include/trace/define_trace.h
index 00723935dcc7..9d665f634614 100644
--- a/include/trace/define_trace.h
+++ b/include/trace/define_trace.h
@@ -133,3 +133,24 @@
 #define CREATE_TRACE_POINTS
 
 #endif /* CREATE_TRACE_POINTS */
+
+#ifndef __DEFINE_PRINT_SYMBOLIC_STR
+#define __DEFINE_PRINT_SYMBOLIC_STR
+static inline const char *
+__print_symbolic_str(int type, struct trace_print_flags *symbols)
+{
+ for (;
</description>
    </item>
    <item>
      <title>[PATCH v2] f2fs: don't call f2fs_issue_discard_timeout() when disc ...</title>
      <author>Yangtao Li &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1444</link>
      <description>Yangtao Li writes: (Summary)  8 ++------
 2 files changed, 6 insertions(+), 8 deletions(-)

diff --git a/fs/f2fs/segment.c b/fs/f2fs/segment.c
index 9486ca49ecb1..d5f150a08285 100644
--- a/fs/f2fs/segment.c
+++ b/fs/f2fs/segment.c
@@ -1655,6 +1655,9 @@ bool f2fs_issue_discard_timeout(struct f2fs_sb_info *sbi)
  struct discard_policy dpolicy;
diff --git a/fs/f2fs/super.c b/fs/f2fs/super.c
index 79bf1faf4161..aa1cadfd34a5 100644
--- a/fs/f2fs/super.c
+++ b/fs/f2fs/super.c
@@ -1576,8 +1576,7 @@ static void f2fs_put_super(struct super_block *sb)
  /* be sure to wait for any on-going discard commands */
  dropped = f2fs_issue_discard_timeout(sbi); !dropped) {
   struct cp_control cpc = {
    .reason = CP_UMOUNT |
   } else {
-   dcc = SM_I(sbi)-&amp;gt;dcc_info;
</description>
    </item>
    <item>
      <title>[PATCH 5/5] perf build: Fix python/perf.so library's name</title>
      <author>Ian Rogers &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1443</link>
      <description>Ian Rogers writes: (Summary)  2 +-
 2 files changed, 4 insertions(+), 2 deletions(-)

diff --git a/tools/perf/Makefile.config b/tools/perf/Makefile.config
index b34288cb1900..ede04e07e9cb 100644
--- a/tools/perf/Makefile.config
+++ b/tools/perf/Makefile.config
@@ -871,6 +871,7 @@ define disable-python_code
   NO_LIBPYTHON := 1
 endef
 
+PYTHON_EXTENSION_SUFFIX := '.so'
 ifdef NO_LIBPYTHON
   $(call disable-python,Python support disabled by user)
 else
@@ -889,7 +890,8 @@ else
       else
          LDFLAGS += $(PYTHON_EMBED_LDFLAGS)
          EXTLIBS += $(PYTHON_EMBED_LIBADD)
-         LANG_BINDINGS += $(obj-perf)python/perf.so
+         PYTHON_EXTENSION_SUFFIX := $(shell $(PYTHON) -c 'from importlib import machinery;
</description>
    </item>
    <item>
      <title>[PATCH 4/5] tools lib symbol: Add dependency test to install_headers</title>
      <author>Ian Rogers &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1442</link>
      <description>Ian Rogers writes: (Summary)  21 ++++++++++++++-------
 1 file changed, 14 insertions(+), 7 deletions(-)

diff --git a/tools/lib/symbol/Makefile b/tools/lib/symbol/Makefile
index ea8707b3442a..13d43c6f92b4 100644
--- a/tools/lib/symbol/Makefile
+++ b/tools/lib/symbol/Makefile
@@ -89,10 +89,10 @@ define do_install_mkdir
 endef
 
 define do_install
- if [ !                                             \
- $(INSTALL) $1 $(if $3,-m $3,) '$(DESTDIR_SQ)$2'
+ if [ ! \
   cp -fpR $(LIBFILE) $(DESTDIR)$(libdir_SQ)
 
-install_headers:
- $(call QUIET_INSTALL, libsymbol_headers) \
-  $(call do_install,kallsyms.h,$(prefix)/include/symbol,644);
</description>
    </item>
    <item>
      <title>[PATCH 3/5] tools lib subcmd: Add dependency test to install_headers</title>
      <author>Ian Rogers &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1441</link>
      <description>Ian Rogers writes: (Summary)  23 +++++++++++++----------
 1 file changed, 13 insertions(+), 10 deletions(-)

diff --git a/tools/lib/subcmd/Makefile b/tools/lib/subcmd/Makefile
index 9a316d8b89df..b87213263a5e 100644
--- a/tools/lib/subcmd/Makefile
+++ b/tools/lib/subcmd/Makefile
@@ -89,10 +89,10 @@ define do_install_mkdir
 endef
 
 define do_install
- if [ !                                             \
- $(INSTALL) $1 $(if $3,-m $3,) '$(DESTDIR_SQ)$2'
+ $(INSTALL) $1 $(if $3,-m $3,) '$2'
 endef
 
 install_lib: $(LIBFILE)
@@ -100,13 +100,16 @@ install_lib: $(LIBFILE)
   $(call do_install_mkdir,$(libdir_SQ)); \
   cp -fpR $(LIBFILE) $(DESTDIR)$(libdir_SQ)
 
-install_headers:
- $(call QUIET_INSTALL, libsubcmd_headers) \
-  $(call do_install,exec-cmd.h,$(prefix)/include/subcmd,644);
</description>
    </item>
    <item>
      <title>[PATCH 2/5] tools lib perf: Add dependency test to install_headers</title>
      <author>Ian Rogers &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1440</link>
      <description>Ian Rogers writes: (Summary) 
+HDRS := bpf_perf.h core.h cpumap.h threadmap.h evlist.h evsel.h event.h mmap.h
+INTERNAL_HDRS := cpumap.h evlist.h evsel.h lib.h mmap.h threadmap.h xyarray.h
+
+INSTALL_HDRS_PFX := $(DESTDIR)$(prefix)/include/perf
+INSTALL_HDRS := $(addprefix $(INSTALL_HDRS_PFX)/, $(HDRS))
+INSTALL_INTERNAL_HDRS_PFX := $(DESTDIR)$(prefix)/include/internal
+INSTALL_INTERNAL_HDRS := $(addprefix $(INSTALL_INTERNAL_HDRS_PFX)/, $(INTERNAL_HDRS))
+
+$(INSTALL_HDRS): $(INSTALL_HDRS_PFX)/%.h: include/perf/%.h
+ $(call QUIET_INSTALL, $@) \
+  $(call do_install,$&amp;lt;,$(INSTALL_HDRS_PFX)/,644)
+
+$(INSTALL_INTERNAL_HDRS): $(INSTALL_INTERNAL_HDRS_PFX)/%.h: include/internal/%.h
+ $(call QUIET_INSTALL, $@) \
+  $(call do_install,$&amp;lt;,$(INSTALL_INTERNAL_HDRS_PFX)/,644)
+
+install_headers: $(INSTALL_HDRS) $(INSTALL_INTERNAL_HDRS)
+ $(call QUIET_INSTALL, libperf_headers)
 
 install_pkgconfig: $(LIBPERF_PC)
  $(call QUIET_INSTALL, $(LIBPERF_PC)) \
-- 
2.39.0.rc0.267.gcb52ba06e7-goog
&lt;br/&gt;

</description>
    </item>
    <item>
      <title>[PATCH 1/5] tools lib api: Add dependency test to install_headers</title>
      <author>Ian Rogers &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1439</link>
      <description>Ian Rogers writes: (Summary) 
+HDRS := cpu.h debug.h io.h
+FD_HDRS := fd/array.h
+FS_HDRS := fs/fs.h fs/tracing_path.h
+INSTALL_HDRS_PFX := $(DESTDIR)$(prefix)/include/api
+INSTALL_HDRS := $(addprefix $(INSTALL_HDRS_PFX)/, $(HDRS))
+INSTALL_FD_HDRS := $(addprefix $(INSTALL_HDRS_PFX)/, $(FD_HDRS))
+INSTALL_FS_HDRS := $(addprefix $(INSTALL_HDRS_PFX)/, $(FS_HDRS))
+
+$(INSTALL_HDRS): $(INSTALL_HDRS_PFX)/%.h: %.h
+ $(call QUIET_INSTALL, $@) \
+  $(call do_install,$&amp;lt;,$(INSTALL_HDRS_PFX)/,644)
+
+$(INSTALL_FD_HDRS): $(INSTALL_HDRS_PFX)/fd/%.h: fd/%.h
+ $(call QUIET_INSTALL, $@) \
+  $(call do_install,$&amp;lt;,$(INSTALL_HDRS_PFX)/fd/,644)
+
+$(INSTALL_FS_HDRS): $(INSTALL_HDRS_PFX)/fs/%.h: fs/%.h
+ $(call QUIET_INSTALL, $@) \
+  $(call do_install,$&amp;lt;,$(INSTALL_HDRS_PFX)/fs/,644)
+
+install_headers: $(INSTALL_HDRS) $(INSTALL_FD_HDRS) $(INSTALL_FS_HDRS)
+ $(call QUIET_INSTALL, libapi_headers)
 
 install: install_lib install_headers
 
-- 
2.39.0.rc0.267.gcb52ba06e7-goog
&lt;br/&gt;

</description>
    </item>
    <item>
      <title>[PATCH 0/5] Improvements to incremental builds</title>
      <author>Ian Rogers &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1438</link>
      <description>Ian Rogers writes: (Summary) Switching to using install_headers caused incremental builds to always
rebuild most targets.
Ian Rogers (5):&lt;br/&gt;
  tools lib api: Add dependency test to install_headers
  tools lib perf: Add dependency test to install_headers
  tools lib subcmd: Add dependency test to install_headers
  tools lib symbol: Add dependency test to install_headers
  perf build: Fix python/perf.so library's name&lt;br/&gt;
  perf build: Fix python/perf.so library's name&lt;br/&gt;
 tools/lib/api/Makefile     |
</description>
    </item>
    <item>
      <title>[PATCH] mm/mmap: Properly unaccount memory on mas_preallocate() fa ...</title>
      <author>Alistair Popple &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1437</link>
      <description>Alistair Popple writes: (Summary)  6 +++---
 1 file changed, 3 insertions(+), 3 deletions(-)

diff --git a/mm/mmap.c b/mm/mmap.c
index 74a84eb33b90..3e50a571c3c4 100644
--- a/mm/mmap.c
+++ b/mm/mmap.c
@@ -2954,7 +2954,7 @@ static int do_brk_flags(struct ma_state *mas, struct vm_area_struct *vma,
      ((vma-&amp;gt;vm_flags &amp;amp; ~VM_SOFTDIRTY) == flags)) {
   mas_set_range(mas, vma-&amp;gt;vm_start, addr + len - 1);
   if (vma-&amp;gt;anon_vma) {
@@ -2976,7 +2976,7 @@ static int do_brk_flags(struct ma_state *mas, struct vm_area_struct *vma,
  /* create a vma struct for an anonymous mapping */
  vma = vm_area_alloc(mm);
</description>
    </item>
    <item>
      <title>Re: [PATCH v8 1/3] platform/chrome: cros_ec_uart: Add cros-ec-uart ...</title>
      <author>Mark Hasemeyer &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1436</link>
      <description>Mark Hasemeyer writes: 
+               wake_up_interruptible(&amp;amp;ec_uart-&amp;gt;response.wait_queue);
I believe the "received" conditional variable should be set before calling
wake_up_interruptible. Otherwise the calling thread will not be (immediately)
awakened as the condition is still false. Currently, the calling thread will
wait until it times out in this case.&lt;br/&gt;
wait until it times out in this case.&lt;br/&gt;
wait until it times out in this case.&lt;br/&gt;
</description>
    </item>
    <item>
      <title>Re: [PATCH] rtc: msc313: Fix function prototype mismatch in msc313 ...</title>
      <author>Kees Cook &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1435</link>
      <description>Kees Cook writes: (Summary)  (The NULL argument is ok?)&lt;br/&gt;
diff --git a/drivers/rtc/rtc-msc313.c b/drivers/rtc/rtc-msc313.c
index f3fde013c4b8..8d7737e0e2e0 100644
--- a/drivers/rtc/rtc-msc313.c
+++ b/drivers/rtc/rtc-msc313.c
@@ -212,22 +212,12 @@ static int msc313_rtc_probe(struct platform_device *pdev)
   return ret;
  }
 
- clk = devm_clk_get(dev, NULL);
  }
 
- ret = clk_prepare_enable(clk);
- if (ret) {
-  dev_err(dev, "Failed to enable the reference clock, %d\n", ret);
- }
-
- ret = devm_add_action_or_reset(dev, (void (*) (void *))clk_disable_unprepare, clk);
- if (ret)
-  return ret;
</description>
    </item>
    <item>
      <title>[PATCH] panic: Taint kernel if fault injection has been used</title>
      <author>"Masami Hiramatsu (Google)" &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1434</link>
      <description>&amp;quot;Masami Hiramatsu (Google)&amp;quot; writes: (Summary) 
diff --git a/kernel/panic.c b/kernel/panic.c
index da323209f583..e396a5fd9bb6 100644
--- a/kernel/panic.c
+++ b/kernel/panic.c
@@ -426,6 +426,7 @@ const struct taint_flag taint_flags[TAINT_FLAGS_COUNT] = {
  [ TAINT_AUX ]   = { 'X', ' ', true },
  [ TAINT_RANDSTRUCT ]  = { 'T', ' ', true },
  [ TAINT_TEST ]   = { 'N', ' ', true },
+ [ TAINT_FAULT_INJECTED ] = { 'J', ' ', false },
 };
</description>
    </item>
    <item>
      <title>Re: [PATCH V2 02/11] cxl/mem: Implement Get Event Records command</title>
      <author>Steven Rostedt &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1433</link>
      <description>Steven Rostedt writes: (Summary)  wrote:&lt;br/&gt;

redefine it in mbox.c.[1]  Then throw it in it's own header as in [3]
I played around a bit, and with the below patch, you can just have:
I played around a bit, and with the below patch, you can just have:
I played around a bit, and with the below patch, you can just have:
#define cxl_event_log_type_str(type)    \&lt;br/&gt;
 __print_symbolic(type,     \&lt;br/&gt;
  { CXL_EVENT_TYPE_INFO, "Informational" }, \
  { CXL_EVENT_TYPE_WARN, "Warning" },  \
  { CXL_EVENT_TYPE_FAIL, "Failure" },  \
  { CXL_EVENT_TYPE_FATAL, "Fatal" })

And everything else should "just work" :-)

I can work on a more formal patch if this works for you.
</description>
    </item>
    <item>
      <title>Re: [PATCH v11 1/3] clocksource: loongson2_hpet: add hpet driver s ...</title>
      <author>Yinbo Zhu &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1432</link>
      <description>Yinbo Zhu writes: (Summary) 
and I will use raw spinlock to replace spin lock.&lt;br/&gt;
and I will use raw spinlock to replace spin lock.&lt;br/&gt;

Why doe you need an explicit start here?&lt;br/&gt;
if the hpet doesn't support period mode,ÿ¿¿¿¿¿ the the hpet irq doesn't enable in
if the hpet doesn't support period mode,ÿ¿¿¿¿¿ the the hpet irq doesn't enable in
oneshot mode, so add it in here.&lt;br/&gt;
oneshot mode, so add it in here.&lt;br/&gt;

thank you for reminding me, I will remove it.&lt;br/&gt;

         tglx&lt;br/&gt;
I don't find the shared infrastructure in LoongArch, I want to supportÿ¿¿¿¿¿ 
hpet for LoongArch&lt;br/&gt;
hpet for LoongArch&lt;br/&gt;
architecture Loongson-2 SoC series.ÿ¿¿¿¿¿ÿ¿¿¿¿¿ the peripherals on the SoC are 
generally&lt;br/&gt;
generally&lt;br/&gt;
descriped by dts.&lt;br/&gt;
descriped by dts.&lt;br/&gt;
descriped by dts.&lt;br/&gt;
In addition, I havent' found any architecture releated differences for 
hpet, at least Mips (loongson)&lt;br/&gt;
hpet, at least Mips (loongson)&lt;br/&gt;
and LoongArch should be like this,ÿ¿¿¿¿¿ in addtion to the hpet contr</description>
    </item>
    <item>
      <title>[syzbot] WARNING in hfsplus_bnode_create</title>
      <author>syzbot &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1431</link>
      <description>syzbot writes: (Summary)  3d 01 f0 ff ff 73 01 c3 48 c7 c1 c0 ff ff ff f7 d8 64 89 01 48
RSP: 002b:00007ffe4e738698 EFLAGS: 00000246 ORIG_RAX: 0000000000000055
RAX: ffffffffffffffda RBX: 0000000000000000 RCX: 00007f4788f48779
RDX: 00007f4788f48779 RSI: 0000000000000000 RDI: 0000000020000300
RBP: 00007f4788f08010 R08: 0000000000000000 R09: 0000000000000000
R10: 0000000000000604 R11: 0000000000000246 R12: 00007f4788f080a0
R13: 0000000000000000 R14: 0000000000000000 R15: 0000000000000000
 &amp;lt;/TASK&amp;gt;
</description>
    </item>
    <item>
      <title>Re: [RFC PATCH v2] mm: Add nodes= arg to memory.reclaim</title>
      <author>Mina Almasry &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1430</link>
      <description>Mina Almasry writes: (Summary) On Thu, Dec 1, 2022 at 7:26 PM Huang, Ying &amp;lt;ying.huang@intel.com&amp;gt; I think this is a common
pattern doen in a few places.&lt;br/&gt;
pattern doen in a few places.&lt;br/&gt;
I think args-&amp;gt;to may point to '\0' because of how strsep() and
match_token() work internally, but I'm somewhat uncomfortable making
assumptions about the implementation of these functions here (it may
change in the future and break the assumption).&lt;br/&gt;
change in the future and break the assumption).&lt;br/&gt;

2.38.1.584.g0f3c55d4c2-goog&lt;br/&gt;
2.38.1.584.g0f3c55d4c2-goog&lt;br/&gt;

</description>
    </item>
    <item>
      <title>linux-next: Tree for Dec 2</title>
      <author>Stephen Rothwell &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1429</link>
      <description>Stephen Rothwell writes: (Summary)  "underlying")
Merging ubifs/next (669d204469c4 ubi: fastmap: Add fastmap control support for 'UBI_IOCATT' ioctl)
Merging v9fs/9p-next (391c18cf776e 9p/xen: check logical size for buffer size)
Merging xfs/for-next (ddfdd530e43f xfs: invalidate xfs_bufs when allocating cow extents)
Merging zonefs/for-next (6bac30bb8ff8 zonefs: Call page_address() on page acquired with GFP_KERNEL flag)
Merging iomap/iomap-for-next (f1bd37a47352 iomap: directly use logical block size)
Merging djw-vfs/vfs-for-next (a79168a0c00d fs/remap_range: avoid spurious writeback on zero length request)
Merging file-locks/locks-next (f2f2494c8aa3 Add process name and pid to locks warning)
Merging iversion/iversion-next (2b3319b35573 nfsd: remove fetch_iversion export operation)
Merging vfs/for-next (7b2f9d90994c Merge branch 'work.misc' into for-next)
CONFLICT (content): Merge conflict in fs/erofs/fscache.c
Merging printk/for-next (789259ec7d3a Merge branch 'rework/console-list-lock' into for-next)
Merging pci/next (0a9dc1e9365b Merge branch</description>
    </item>
    <item>
      <title>[PATCH] arm64/boot/dts and arm_scpi: add to support Phytium FT2004 CPU</title>
      <author>Wang Honghui &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1428</link>
      <description>Wang Honghui writes: (Summary) 
+
 config ARCH_QCOM
  bool "Qualcomm Platforms"
  select GPIOLIB
diff --git a/arch/arm64/boot/dts/Makefile b/arch/arm64/boot/dts/Makefile
index 7b107fa7414b..386e74291f32 100644
--- a/arch/arm64/boot/dts/Makefile
+++ b/arch/arm64/boot/dts/Makefile
@@ -21,6 +21,7 @@ subdir-y += mediatek
 subdir-y += microchip
 subdir-y += nuvoton
 subdir-y += nvidia
+subdir-y += phytium
 subdir-y += qcom
 subdir-y += realtek
 subdir-y += renesas
diff --git a/arch/arm64/boot/dts/phytium/Makefile b/arch/arm64/boot/dts/phytium/Makefile
new file mode 100644
index 000000000000..911190cb1199
--- /dev/null
+++ b/arch/arm64/boot/dts/phytium/Makefile
@@ -0,0 +1,5 @@
+dtb-$(CONFIG_ARCH_PHYTIUM) += ft2004-devboard-d4-dsk.dtb
+
+always  := $(dtb-y)
+subdir-y := $(dts-dirs)
+clean-files := *.dtb
diff --git a/arch/arm64/boot/dts/phytium/ft2004-devboard-d4-dsk.dts b/arch/arm64/boot/dts/phytium/ft2004-devboard-d4-dsk.dts
new file mode 100644
index 000000000000..5bef2e886292
--- /dev/null
+++ b/arch/arm64/boot/dts/phytium/ft2004-devboard-d4-d</description>
    </item>
    <item>
      <title>Re: [PATCH net-next 00/11] mptcp: PM listener events + selftests c ...</title>
      <author>patchwork-bot+netdevbpf@kernel ... &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1427</link>
      <description>   patchwork-bot+netdevbpf@kernel ... writes: (Summary) Hello:&lt;br/&gt;
Hello:&lt;br/&gt;
This series was applied to netdev/net-next.git (master)
by Jakub Kicinski &amp;lt;kuba@kernel.org&amp;gt;:&lt;br/&gt;
by Jakub Kicinski &amp;lt;kuba@kernel.org&amp;gt;:&lt;br/&gt;
On Wed, 30 Nov 2022 15:06:22 +0100 you wrote:&lt;br/&gt;

[...]&lt;br/&gt;
Here is the summary with links:&lt;br/&gt;
  - [net-next,01/11] selftests: mptcp: run mptcp_inq from a clean netns
    &lt;a href="https://git.kernel.org/netdev/net-next/c/b4e0df4cafe1"&gt;https://git.kernel.org/netdev/net-next/c/b4e0df4cafe1&lt;/a&gt;
  - [net-next,02/11] selftests: mptcp: removed defined but unused vars
    &lt;a href="https://git.kernel.org/netdev/net-next/c/b71dd705179c"&gt;https://git.kernel.org/netdev/net-next/c/b71dd705179c&lt;/a&gt;
  - [net-next,03/11] selftests: mptcp: uniform 'rndh' variable
    &lt;a href="https://git.kernel.org/netdev/net-next/c/787eb1e4df93"&gt;https://git.kernel.org/netdev/net-next/c/787eb1e4df93&lt;/a&gt;
  - [net-next,04/11] selftests: mptcp: clearly declare global ns vars
    &lt;a href="https://git.kernel.org/netdev/net-next/c/de2392028a19"&gt;https://git.ke</description>
    </item>
    <item>
      <title>Re: [PATCH bpf-next v3 1/4] bpf: Adapt 32-bit return value kfunc f ...</title>
      <author>kernel test robot &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1426</link>
      <description>kernel test robot writes: (Summary) 
</description>
    </item>
    <item>
      <title>Re: [PATCH] net: check for dev pointer being NULL in dev_hard_head ...</title>
      <author>Eric Dumazet &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1425</link>
      <description>Eric Dumazet writes: (Summary) On Thu, Dec 1, 2022 at 9:44 PM George Kennedy &amp;lt;george.kennedy@oracle.com&amp;gt; wrote:

The repro ran overnight without failure with the patch applied.
Yes, but the patch is hiding a potential bug that might show up with
other 'repros'&lt;br/&gt;
other 'repros'&lt;br/&gt;
other 'repros'&lt;br/&gt;
other 'repros'&lt;br/&gt;

Will try.&lt;br/&gt;
Thanks, having a repro definitely should help to find the real bug.
I took a look at macvlan , and could not see how vlan-&amp;gt;lowerdev  could
be NULL in the first place.&lt;br/&gt;
be NULL in the first place.&lt;br/&gt;

2.31.1&lt;br/&gt;
2.31.1&lt;br/&gt;

</description>
    </item>
    <item>
      <title>Re: [PATCH v6 0/5] net/tcp: Dynamically disable TCP-MD5 static key</title>
      <author>patchwork-bot+netdevbpf@kernel ... &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1424</link>
      <description>   patchwork-bot+netdevbpf@kernel ... writes: (Summary)  [...]

Here is the summary with links:
  - [v6,1/5] jump_label: Prevent key-&amp;gt;enabled int overflow
    &lt;a href="https://git.kernel.org/netdev/net-next/c/eb8c507296f6"&gt;https://git.kernel.org/netdev/net-next/c/eb8c507296f6&lt;/a&gt;
  - [v6,2/5] net/tcp: Separate tcp_md5sig_info allocation into tcp_md5sig_info_add()
    &lt;a href="https://git.kernel.org/netdev/net-next/c/f62c7517ffa1"&gt;https://git.kernel.org/netdev/net-next/c/f62c7517ffa1&lt;/a&gt;
  - [v6,3/5] net/tcp: Disable TCP-MD5 static key on tcp_md5sig_info destruction
    &lt;a href="https://git.kernel.org/netdev/net-next/c/459837b522f7"&gt;https://git.kernel.org/netdev/net-next/c/459837b522f7&lt;/a&gt;
  - [v6,4/5] net/tcp: Do cleanup on tcp_md5_key_copy() failure
    &lt;a href="https://git.kernel.org/netdev/net-next/c/b389d1affc2c"&gt;https://git.kernel.org/netdev/net-next/c/b389d1affc2c&lt;/a&gt;
  - [v6,5/5] net/tcp: Separate initialization of twsk
    &lt;a href="https://git.kernel.org/netdev/net-next/c/c5b8b515a211"&gt;https://git.kernel.org/netdev/net-next/c/c5b8b515a211&lt;/a&gt;

You are a</description>
    </item>
    <item>
      <title>Re: [PATCH v8 03/11] dt-bindings: clock: meson: add A1 peripheral  ...</title>
      <author>Rob Herring &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1423</link>
      <description>Rob Herring writes: (Summary) 
On Fri, 02 Dec 2022 01:56:55 +0300, Dmitry Rokosov wrote:

 create mode 100644 include/dt-bindings/clock/a1-clkc.h
My bot found errors running 'make DT_CHECKER_FLAGS=-m dt_binding_check'
on your patch (DT_CHECKER_FLAGS is new in v5.13):&lt;br/&gt;
on your patch (DT_CHECKER_FLAGS is new in v5.13):&lt;br/&gt;
yamllint warnings/errors:&lt;br/&gt;
yamllint warnings/errors:&lt;br/&gt;
dtschema/dtc warnings/errors:&lt;br/&gt;
./Documentation/devicetree/bindings/clock/amlogic,a1-clkc.yaml: $id: relative path/filename doesn't match actual path or filename
 expected: &lt;a href="http://devicetree.org/schemas/clock/amlogic,a1-clkc.yaml#"&gt;http://devicetree.org/schemas/clock/amlogic,a1-clkc.yaml#&lt;/a&gt;
Documentation/devicetree/bindings/clock/amlogic,a1-clkc.example.dts:18.48-30.11: Warning (unit_address_vs_reg): /example-0/periphs-clock-controller: node has a reg or ranges property, but no unit name
/builds/robherring/dt-review-ci/linux/Documentation/devicetree/bindings/clock/amlogic,a1-clkc.example.dtb: periphs-clock-controller: reg: [[0, 20</description>
    </item>
    <item>
      <title>Re: [PATCH v8 01/11] dt-bindings: clock: meson: add A1 PLL clock c ...</title>
      <author>Rob Herring &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1422</link>
      <description>Rob Herring writes: (Summary) 
On Fri, 02 Dec 2022 01:56:53 +0300, Dmitry Rokosov wrote:

 create mode 100644 include/dt-bindings/clock/a1-pll-clkc.h
My bot found errors running 'make DT_CHECKER_FLAGS=-m dt_binding_check'
on your patch (DT_CHECKER_FLAGS is new in v5.13):&lt;br/&gt;
on your patch (DT_CHECKER_FLAGS is new in v5.13):&lt;br/&gt;
yamllint warnings/errors:&lt;br/&gt;
./Documentation/devicetree/bindings/clock/amlogic,a1-pll-clkc.yaml:26:6: [warning] wrong indentation: expected 6 but found 5 (indentation)
./Documentation/devicetree/bindings/clock/amlogic,a1-pll-clkc.yaml:26:6: [warning] wrong indentation: expected 6 but found 5 (indentation)
dtschema/dtc warnings/errors:&lt;br/&gt;
./Documentation/devicetree/bindings/clock/amlogic,a1-pll-clkc.yaml: $id: relative path/filename doesn't match actual path or filename
 expected: &lt;a href="http://devicetree.org/schemas/clock/amlogic,a1-pll-clkc.yaml#"&gt;http://devicetree.org/schemas/clock/amlogic,a1-pll-clkc.yaml#&lt;/a&gt;
/builds/robherring/dt-review-ci/linux/Documentation/devicetree/bindings/clock/amlog</description>
    </item>
    <item>
      <title>Re: [PATCH net-next 00/11] mptcp: PM listener events + selftests c ...</title>
      <author>Jakub Kicinski &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1421</link>
      <description>Jakub Kicinski writes: On Wed, 30 Nov 2022 15:06:22 +0100 Matthieu Baerts wrote:

MPTCP selftests to ease the maintenance and the addition of new tests.
Also could you warp you cover letters at 72 characters?
I need to reflow them before I can read them :(&lt;br/&gt;
I need to reflow them before I can read them :(&lt;br/&gt;
I need to reflow them before I can read them :(&lt;br/&gt;
</description>
    </item>
    <item>
      <title>Re: [PATCH net-next 06/11] mptcp: add pm listener events</title>
      <author>Jakub Kicinski &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1420</link>
      <description>Jakub Kicinski writes: On Wed, 30 Nov 2022 15:06:28 +0100 Matthieu Baerts wrote:

+	kfree_skb(skb);&lt;br/&gt;
nlmsg_free(), could you inspect the code and follow up?
nlmsg_free(), could you inspect the code and follow up?
nlmsg_free(), could you inspect the code and follow up?
</description>
    </item>
    <item>
      <title>Re: [RFC Patch net-next 3/5] net: dsa: microchip: add eth mac grou ...</title>
      <author>Jakub Kicinski &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1419</link>
      <description>Jakub Kicinski writes: (Summary) On Wed, 30 Nov 2022 18:59:00 +0530 Rakesh Sankaranarayanan wrote:

+      ctr[ksz9477_tx_pause];&lt;br/&gt;
do control frames count towards FramesTransmittedOK?
Please check the standard I don't recall.&lt;br/&gt;
Please check the standard I don't recall.&lt;br/&gt;

+ mac_stats-&amp;gt;OctetsTransmittedOK = ctr[ksz9477_tx_total_col];
You use the same counter for RMON oversize statistic, the two
definitely have different semantics, please check the standard
and the datasheet.&lt;br/&gt;
and the datasheet.&lt;br/&gt;
Remember that you don't have to fill in all the stats, if the HW does
not maintain a matching statistic - leave the field be. Kernel will
not report to user space unset fields.&lt;br/&gt;
not report to user space unset fields.&lt;br/&gt;
not report to user space unset fields.&lt;br/&gt;

</description>
    </item>
    <item>
      <title>RE: [PATCH v7 2/5] Drivers: hv: Setup synic registers in case of n ...</title>
      <author>"Michael Kelley (LINUX)" &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1418</link>
      <description>&amp;quot;Michael Kelley (LINUX)&amp;quot; writes: (Summary)  + switch (reg) {
&amp;gt; + case HV_REGISTER_SIMP:
&amp;gt; + case HV_REGISTER_NESTED_SIEFP:
&amp;gt; + case HV_REGISTER_SCONTROL:
&amp;gt; + case HV_REGISTER_SINT0:
&amp;gt; + case HV_REGISTER_EOM:
&amp;gt; + if (nested)
&amp;gt; + if (nested)
&amp;gt; +  /* Write proxy bit via wrmsl instruction */
&amp;gt; +      reg &amp;lt;=3D HV_REGISTER_SINT15)
&amp;gt; + } else {
&amp;gt; + }
&amp;gt; +  if (hv_root_partition) {
&amp;gt; +   if (hv_cpu-&amp;gt;synic_message_page !=3D NULL)
&amp;gt; +  } else {
&amp;gt; +  }
&amp;gt;
</description>
    </item>
    <item>
      <title>Re: [PATCH 00/14] staging: vc04_services: bcm2835-isp support</title>
      <author>Umang Jain &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1417</link>
      <description>Umang Jain writes: (Summary)  But from my perspective - bcm2835-camera is _not_ 
going out of staging - it'll either sit here (or probably dropped) as 
statied from [1]&lt;br/&gt;
statied from [1]&lt;br/&gt;
```&lt;br/&gt;
+ * There are two camera drivers in the kernel for BCM283x - this one
+ * and bcm2835-camera (currently in staging).&lt;br/&gt;
```&lt;br/&gt;
```&lt;br/&gt;
The bcm2835-camera is meant to be replaced by unicam [1] , but the ISP 
(bcm2835-isp) is meant to be worked with unicam [1].
</description>
    </item>
    <item>
      <title>[PATCH][RFC] x86: override prefer_mwait_c1_over_halt to avoid load ...</title>
      <author>lirongqing@baidu ... &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1416</link>
      <description>   lirongqing@baidu ... writes: (Summary) From: Li RongQing &amp;lt;lirongqing@baidu.com&amp;gt;&lt;br/&gt;
From: Li RongQing &amp;lt;lirongqing@baidu.com&amp;gt;&lt;br/&gt;
x86 KVM guests with MWAIT can load cpuidle-haltpoll driver, and will
cause performance degradation, so override prefer_mwait_c1_over_halt
to a new value, aviod loading cpuidle-haltpoll driver
to a new value, aviod loading cpuidle-haltpoll driver
Signed-off-by: Li RongQing &amp;lt;lirongqing@baidu.com&amp;gt; 1 +
 2 files changed, 2 insertions(+), 1 deletion(-)

diff --git a/arch/x86/include/asm/processor.h b/arch/x86/include/asm/processor.h
index 67c9d73..6bc94fd 100644
--- a/arch/x86/include/asm/processor.h
+++ b/arch/x86/include/asm/processor.h
@@ -658,7 +658,7 @@ extern void amd_e400_c1e_apic_setup(void);
</description>
    </item>
    <item>
      <title>drivers/perf/arm_dmc620_pmu.c:524:9: sparse: sparse: incorrect typ ...</title>
      <author>kernel test robot &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1415</link>
      <description>kernel test robot writes: (Summary) 
</description>
    </item>
    <item>
      <title>[PATCH v4,1/3] media: dt-bindings: media: mediatek: vcodec: adapt  ...</title>
      <author>Yunfei Dong &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1414</link>
      <description>Yunfei Dong writes: (Summary) 
 
       clocks:
+        minItems: 1
         maxItems: 5
 
       clock-names:
-        items:
-          - const: sel
-          - const: soc-vdec
-          - const: soc-lat
-          - const: vdec
-          - const: top
+        minItems: 1
+        maxItems: 5
 
       assigned-clocks:
         maxItems: 1
@@ -159,6 +156,38 @@ then:
   required:
     - interrupts
 
+allOf:
+  - if:
+      properties:
+        compatible:
+          contains:
+            enum:
+              - mediatek,mt8192-vcodec-dec
+    then:
+      properties:
+        clock-names:
+          items:
+            - const: sel
+            - const: soc-vdec
+            - const: soc-lat
+            - const: vdec
+            - const: top
+
+  - if:
+      properties:
+        compatible:
+          contains:
+            enum:
+              - mediatek,mt8195-vcodec-dec
+    then:
+      properties:
+        clock-names:
+          items:
+            - const: sel
+            - const: vdec
+            - const: lat
+           </description>
    </item>
    <item>
      <title>[PATCH v4,2/3] media: dt-bindings: media: mediatek: vcodec: Change ...</title>
      <author>Yunfei Dong &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1413</link>
      <description>Yunfei Dong writes: (Summary)  6 +++++-
 1 file changed, 5 insertions(+), 1 deletion(-)

diff --git a/Documentation/devicetree/bindings/media/mediatek,vcodec-subdev-decoder.yaml b/Documentation/devicetree/bindings/media/mediatek,vcodec-subdev-decoder.yaml
index a08b2c814f40..fffed7f515ae 100644
--- a/Documentation/devicetree/bindings/media/mediatek,vcodec-subdev-decoder.yaml
+++ b/Documentation/devicetree/bindings/media/mediatek,vcodec-subdev-decoder.yaml
@@ -61,7 +61,10 @@ properties:
       - mediatek,mt8195-vcodec-dec
 
   reg:
-    maxItems: 1
+    minItems: 1
+    items:
+      - description: VDEC_SYS register space
+      - description: VDEC_RACING_CTRL register space
 
   iommus:
     minItems: 1
@@ -98,6 +101,7 @@ patternProperties:
 
       reg:
         maxItems: 1
+        description: VDEC_MISC register space
 
       interrupts:
         maxItems: 1
-- 
2.18.0
&lt;br/&gt;

</description>
    </item>
    <item>
      <title>[PATCH v4,3/3] arm64: dts: mt8195: Add video decoder node</title>
      <author>Yunfei Dong &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1412</link>
      <description>Yunfei Dong writes: (Summary) 
+    iommus = &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L24_VDEC_LAT0_VLD_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L24_VDEC_LAT0_VLD2_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L24_VDEC_LAT0_AVC_MC_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L24_VDEC_LAT0_PRED_RD_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L24_VDEC_LAT0_TILE_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L24_VDEC_LAT0_WDMA_EXT&amp;gt;;
+    iommus = &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L21_VDEC_MC_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L21_VDEC_UFO_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L21_VDEC_PP_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L21_VDEC_PRED_RD_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L21_VDEC_PRED_WR_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L21_VDEC_PPWRAP_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L21_VDEC_TILE_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L21_VDEC_VLD_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L21_VDEC_VLD2_EXT&amp;gt;,
+      &amp;lt;&amp;amp;iommu_vdo M4U_PORT_L21_VDEC_AVC_MV_EXT&amp;gt;;
</description>
    </item>
    <item>
      <title>[PATCH v2 3/3] leds: add driver for SPI driven WorldSemi WS2812B R ...</title>
      <author>Chuanhong Guo &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1411</link>
      <description>Chuanhong Guo writes: (Summary)  i++)
+  ws2812b_set_byte(priv-&amp;gt;data_buf + WS2812B_RESET_LEN +
+      i * WS2812B_BYTES_PER_COLOR,
+     0);
+  /* WS2812B LEDs usually come with GRB color */
+  u32 color_idx[WS2812B_NUM_COLORS] = {
+   LED_COLOR_ID_GREEN,
+   LED_COLOR_ID_RED,
+   LED_COLOR_ID_BLUE,
+  };
+
+static struct spi_driver ws2812b_driver = {
+ .probe  = ws2812b_probe,
+ .remove  = ws2812b_remove,
+ .id_table = ws2812b_spi_ids,
+ .driver = {
+  .name  = KBUILD_MODNAME,
+  .of_match_table = ws2812b_dt_ids,
+ },
+};
</description>
    </item>
    <item>
      <title>[PATCH v2 2/3] dt-bindings: leds: add dt schema for worldsemi,ws28 ...</title>
      <author>Chuanhong Guo &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1410</link>
      <description>Chuanhong Guo writes: (Summary) 
+
+allOf:
+  - $ref: /schemas/spi/spi-peripheral-props.yaml#
+
+properties:
+  compatible:
+    const: worldsemi,ws2812b
+
+  reg:
+    maxItems: 1
+
+  spi-max-frequency:
+    minimum: 2105000
+    maximum: 2850000
+
+  "#address-cells":
+    const: 1
+
+  "#size-cells":
+    const: 0
+
+patternProperties:
+  "^multi-led@[0-9a-f]+$":
+    type: object
+    $ref: leds-class-multicolor.yaml#
+    unevaluatedProperties: false
+
+    properties:
+      color-index:
+        description: |
+        maxItems: 1
+
+    required:
+      - reg
+      - color
+      - function
+
+required:
+  - compatible
+
+additionalProperties: false
+
+examples:
+  - |
</description>
    </item>
    <item>
      <title>[PATCH v2 1/3] dt-bindings: vendor-prefixes: add an entry for Worl ...</title>
      <author>Chuanhong Guo &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1409</link>
      <description>Chuanhong Guo writes: (Summary) Add vendor prefix for WorldSemi that makes WS2812B&lt;br/&gt;
individually-addressable RGB LEDs.&lt;br/&gt;
individually-addressable RGB LEDs.&lt;br/&gt;
Signed-off-by: Chuanhong Guo &amp;lt;gch981213@gmail.com&amp;gt; 2 ++
 1 file changed, 2 insertions(+)

diff --git a/Documentation/devicetree/bindings/vendor-prefixes.yaml b/Documentation/devicetree/bindings/vendor-prefixes.yaml
index 10c178d97b02..32274d894664 100644
--- a/Documentation/devicetree/bindings/vendor-prefixes.yaml
+++ b/Documentation/devicetree/bindings/vendor-prefixes.yaml
@@ -1462,6 +1462,8 @@ patternProperties:
     description: Wondermedia Technologies, Inc.
</description>
    </item>
    <item>
      <title>[PATCH v2 0/3] leds: add driver for SPI driven WorldSemi WS2812B R ...</title>
      <author>Chuanhong Guo &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1408</link>
      <description>Chuanhong Guo writes: (Summary)  The SPI
frequency needs to be 2.105MHz~2.85MHz for the timing to be
correct and the controller needs to transfer all the bytes
continuously.&lt;br/&gt;
continuously.&lt;br/&gt;
Changes since v1:&lt;br/&gt;
various dt binding fixes&lt;br/&gt;
add support for default-brightness&lt;br/&gt;
add support for default-brightness&lt;br/&gt;
Chuanhong Guo (3):&lt;br/&gt;
  dt-bindings: vendor-prefixes: add an entry for WorldSemi
  dt-bindings: leds: add dt schema for worldsemi,ws2812b-spi
  leds: add driver for SPI driven WorldSemi WS2812B RGB LEDs
  leds: add driver for SPI driven WorldSemi WS2812B RGB LEDs
 .../bindings/leds/worldsemi,ws2812b.yaml      |
</description>
    </item>
    <item>
      <title>[PATCH v5 2/2] RDMA/srp: Fix error return code in srp_parse_options()</title>
      <author>Wang Yufen &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1407</link>
      <description>Wang Yufen writes: (Summary) 
+   if (ret) {
+    pr_warn("match_int() failed for max cmd_per_lun parameter '%s', Error %d\n",
+     p, ret);
+   if (ret) {
+    pr_warn("match_int() failed for max target_can_queue parameter '%s', Error %d\n",
+     p, ret);
+   if (ret) {
+    pr_warn("match_int() failed for max cmd_sg_entries parameter '%s', Error %d\n",
+     p, ret);
+   if (ret) {
+    pr_warn("match_int() failed for max sg_tablesize parameter '%s', Error %d\n",
+     p, ret);
+   if (ret) {
+    pr_warn("match_int() failed for max it_iu_size parameter '%s', Error %d\n",
+     p, ret);
</description>
    </item>
    <item>
      <title>[PATCH v5 1/2] RDMA/hfi1: Fix error return code in parse_platform_ ...</title>
      <author>Wang Yufen &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1406</link>
      <description>Wang Yufen writes: (Summary)  6 ++++++
 1 file changed, 6 insertions(+)

diff --git a/drivers/infiniband/hw/hfi1/firmware.c b/drivers/infiniband/hw/hfi1/firmware.c
index 1d77514..0c0cef5 100644
--- a/drivers/infiniband/hw/hfi1/firmware.c
+++ b/drivers/infiniband/hw/hfi1/firmware.c
@@ -1743,6 +1743,7 @@ int parse_platform_config(struct hfi1_devdata *dd)
 
  if (!dd-&amp;gt;platform_config.data) {
   dd_dev_err(dd, "%s: Missing config file\n", __func__); dd-&amp;gt;platform_config.size) {
   dd_dev_info(dd,
@@ -1794,6 +1797,7 @@ int parse_platform_config(struct hfi1_devdata *dd)
    dd_dev_err(dd, "%s: Failed validation at offset %ld\n",
        __func__, (ptr - (u32 *)
            dd-&amp;gt;platform_config.data));
</description>
    </item>
    <item>
      <title>Re: [PATCH v4 2/2] arm64: dts: qcom: Add base QDU1000/QRU1000 IDP DTs</title>
      <author>Bjorn Andersson &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1405</link>
      <description>Bjorn Andersson writes: (Summary) On Fri, Nov 18, 2022 at 11:22:41AM -0800, Melody Olvera wrote:

+  xo_board: xo-board {&lt;br/&gt;
Please add a -clk suffix to the node name.&lt;br/&gt;
Please add a -clk suffix to the node name.&lt;br/&gt;

+   clock-output-names = "xo_board";&lt;br/&gt;
Nothing should rely on this name, so please don't specify it.

+ regulators {&lt;br/&gt;
Seems like this is supposed to match -regulators$, so how about
pm8150-regulators?&lt;br/&gt;
pm8150-regulators?&lt;br/&gt;
Regards,&lt;br/&gt;
Bjorn&lt;br/&gt;
Bjorn&lt;br/&gt;

2.38.1&lt;br/&gt;
2.38.1&lt;br/&gt;

</description>
    </item>
    <item>
      <title>Re: [PATCH 1/2] regulator: mt6370: Fix potential UAF issue</title>
      <author>ChiYuan Huang &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1404</link>
      <description>ChiYuan Huang writes: Mark Brown &amp;lt;broonie@kernel.org&amp;gt; =E6=96=BC 2022=E5=B9=B412=E6=9C=881=E6=97=
=A5 =E9=80=B1=E5=9B=9B =E6=99=9A=E4=B8=8A7:43=E5=AF=AB=E9=81=93=EF=BC=9A

DT.&lt;br/&gt;
Not to affect too much, the better way may change the 'regulator_register' =
API.&lt;br/&gt;
Append it as regulator_register(dev, .....
This could separate device object with devres allocation and DT lookup.


</description>
    </item>
    <item>
      <title>[PATCH v2] Input: use sysfs_emit() to instead of scnprintf()</title>
      <author>&lt;ye.xingchen@zte ... &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1403</link>
      <description>   &amp;lt;ye.xingchen@zte ... writes: (Summary)  8 ++++----
 1 file changed, 4 insertions(+), 4 deletions(-)

diff --git a/drivers/input/input.c b/drivers/input/input.c
index ca2e3dd7188b..c061bbe96086 100644
--- a/drivers/input/input.c
+++ b/drivers/input/input.c
@@ -1362,8 +1362,8 @@ static ssize_t input_dev_show_##name(struct device *dev,  \
 {         \
  struct input_dev *input_dev = to_input_dev(dev);  \
          \
- return scnprintf(buf, PAGE_SIZE, "%s\n",   \
-    input_dev-&amp;gt;name ? \
 }         \
 static DEVICE_ATTR(name, S_IRUGO, input_dev_show_##name, NULL)

@@ -1455,7 +1455,7 @@ static ssize_t inhibited_show(struct device *dev,
 {
  struct input_dev *input_dev = to_input_dev(dev);
</description>
    </item>
    <item>
      <title>[PATCH] erofs: fix inline pcluster memory leak</title>
      <author>Gao Xiang &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1402</link>
      <description>Gao Xiang writes: (Summary)  5 ++++-
 1 file changed, 4 insertions(+), 1 deletion(-)

diff --git a/fs/erofs/zdata.c b/fs/erofs/zdata.c
index ab22100be861..e14e6c32e70d 100644
--- a/fs/erofs/zdata.c
+++ b/fs/erofs/zdata.c
@@ -496,7 +496,8 @@ static int z_erofs_register_pcluster(struct z_erofs_decompress_frontend *fe)
  struct erofs_workgroup *grp;
  }
@@ -1114,6 +1115,8 @@ static int z_erofs_decompress_pcluster(struct z_erofs_decompress_backend *be,
  /* pcluster lock MUST be taken before the following line */
  WRITE_ONCE(pcl-&amp;gt;next, Z_EROFS_PCLUSTER_NIL);
</description>
    </item>
    <item>
      <title>[Patch v4 08/13] Drivers: hv: vmbus: Remove second mapping of VMBu ...</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1401</link>
      <description>Michael Kelley writes: (Summary) 
-
- if (hv_is_isolation_supported()) {
-  ret = set_memory_decrypted((unsigned long)
-        vmbus_connection.monitor_pages[0],
-        1);
-   }
-
-   vmbus_connection.monitor_pages[1]
-    = memremap(vmbus_connection.monitor_pages_pa[1],
-        HV_HYP_PAGE_SIZE,
-        MEMREMAP_WB);
-   }
-  }
-
-  /*
-   * Set memory host visibility hvcall smears memory
-   * and so zero monitor pages here.
</description>
    </item>
    <item>
      <title>[Patch v4 13/13] PCI: hv: Enable PCI pass-thru devices in Confiden ...</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1400</link>
      <description>Michael Kelley writes: (Summary)  168 ++++++++++++++++++++++--------------
 2 files changed, 105 insertions(+), 65 deletions(-)

diff --git a/drivers/hv/channel_mgmt.c b/drivers/hv/channel_mgmt.c
index cc23b90..007f26d 100644
--- a/drivers/hv/channel_mgmt.c
+++ b/drivers/hv/channel_mgmt.c
@@ -67,7 +67,7 @@
  { .dev_type = HV_PCIE,
    HV_PCIE_GUID,
    .perf_device = false,
-   .allowed_in_isolated = false,
+   .allowed_in_isolated = true,
  },
 
  /* Synthetic Frame Buffer */
diff --git a/drivers/pci/controller/pci-hyperv.c b/drivers/pci/controller/pci-hyperv.c
index bbe6e36..f874f89 100644
--- a/drivers/pci/controller/pci-hyperv.c
+++ b/drivers/pci/controller/pci-hyperv.c
@@ -514,6 +514,7 @@ struct hv_pcibus_device {
 
  /* Highest slot of child device with resources allocated */
  int wslot_res_allocated;  /* Truncates to 16 bits */
+ } else {
+  void __iomem *addr = hbus-&amp;gt;cfg_addr + CFG_PAGE_OFFSET +
+          PCI_VENDOR_ID;
</description>
    </item>
    <item>
      <title>[Patch v4 04/13] x86/mm: Handle decryption/re-encryption of bss_de ...</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1399</link>
      <description>Michael Kelley writes: (Summary) 
 
  /*
-  * The unused memory range was mapped decrypted, change the encryption
-  * attribute from decrypted to encrypted before freeing it. Base the
+  * re-encryption on the same condition used for the decryption in
+  * sme_postprocess_startup(). Higher level abstractions, such as
+  * CC_ATTR_MEM_ENCRYPT, aren't necessarily equivalent in a Hyper-V VM
+  * using vTOM, where sme_me_mask is always zero.
</description>
    </item>
    <item>
      <title>[Patch v4 09/13] Drivers: hv: vmbus: Remove second way of mapping  ...</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1398</link>
      <description>Michael Kelley writes: (Summary)  i++)
-   pfns_wraparound[i + 1] = pfn + i % (page_cnt - 1) + 1;
-
-  ring_info-&amp;gt;ring_buffer = (struct hv_ring_buffer *)
-   vmap_pfn(pfns_wraparound, page_cnt * 2 - 1,
-     pgprot_decrypted(PAGE_KERNEL_NOENC));
- } else {
-  pages_wraparound = kcalloc(page_cnt * 2 - 1,
-        sizeof(struct page *),
-        GFP_KERNEL); i++)
-   pages_wraparound[i + 1] =
-    &amp;amp;pages[i % (page_cnt - 1) + 1];
</description>
    </item>
    <item>
      <title>[Patch v4 11/13] Drivers: hv: Don't remap addresses that are above ...</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1397</link>
      <description>Michael Kelley writes: (Summary)  23 +++++++++++++----------
 2 files changed, 18 insertions(+), 12 deletions(-)

diff --git a/arch/x86/hyperv/hv_init.c b/arch/x86/hyperv/hv_init.c
index 6dbfb26..9070a78 100644
--- a/arch/x86/hyperv/hv_init.c
+++ b/arch/x86/hyperv/hv_init.c
@@ -63,7 +63,10 @@ static int hyperv_init_ghcb(void)
   * memory boundary and map it here.
  }
 
diff --git a/drivers/hv/hv.c b/drivers/hv/hv.c
index 4d6480d..410e6c4 100644
--- a/drivers/hv/hv.c
+++ b/drivers/hv/hv.c
@@ -217,11 +217,13 @@ void hv_synic_enable_regs(unsigned int cpu)
  simp.simp_enabled = 1;
</description>
    </item>
    <item>
      <title>[Patch v4 12/13] PCI: hv: Add hypercalls to read/write MMIO space</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1396</link>
      <description>Michael Kelley writes: (Summary) 
+
+ /*
+  * Must be called with interrupts disabled so it is safe
+  * to use the per-cpu input argument page.
+ if (hv_result_success(ret)) {
+  switch (size) {
+  case 1:
+   *val = *(u8 *)(out-&amp;gt;data);
+  }
+ } else
+  dev_err(dev, "MMIO read hypercall error %llx addr %llx size %d\n",
+    ret, gpa, size);
</description>
    </item>
    <item>
      <title>[Patch v4 07/13] swiotlb: Remove bounce buffer remapping for Hyper-V</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1395</link>
      <description>Michael Kelley writes: (Summary) 
-#endif
-  }
  }
 
  if (hv_max_functions_eax &amp;gt;= HYPERV_CPUID_NESTED_FEATURES) {
diff --git a/include/linux/swiotlb.h b/include/linux/swiotlb.h
index 35bc4e2..13d7075 100644
--- a/include/linux/swiotlb.h
+++ b/include/linux/swiotlb.h
@@ -185,6 +185,4 @@ static inline bool is_swiotlb_for_alloc(struct device *dev)
 }
 #endif /* CONFIG_DMA_RESTRICTED_POOL */
 
-extern phys_addr_t swiotlb_unencrypted_base;
-
- if (swiotlb_unencrypted_base) {
-  phys_addr_t paddr = mem-&amp;gt;start + swiotlb_unencrypted_base;
  }
 
- /*
-  * If swiotlb_unencrypted_base is set, the bounce buffer memory will
-  * be remapped and cleared in swiotlb_update_mem_attributes.
</description>
    </item>
    <item>
      <title>[Patch v4 05/13] init: Call mem_encrypt_init() after Hyper-V hyper ...</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1394</link>
      <description>Michael Kelley writes: (Summary) 
+
+ /*
+  * This needs to be called before any devices perform DMA
+  * operations that might use the SWIOTLB bounce buffers. It will
+  * mark the bounce buffers as decrypted so that their usage will
+  * not cause "plain-text" data to be decrypted when accessed. It
+  * must be called after late_time_init() so that Hyper-V x86/x64
+  * hypercalls work when the SWIOTLB bounce buffers are decrypted.
</description>
    </item>
    <item>
      <title>[Patch v4 10/13] hv_netvsc: Remove second mapping of send and recv ...</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1393</link>
      <description>Michael Kelley writes: (Summary)   2 --
 6 files changed, 2 insertions(+), 90 deletions(-)

diff --git a/arch/x86/hyperv/ivm.c b/arch/x86/hyperv/ivm.c
index 8e2717d..83b71bd 100644
--- a/arch/x86/hyperv/ivm.c
+++ b/arch/x86/hyperv/ivm.c
@@ -356,34 +356,6 @@ void __init hv_vtom_init(void)
 
 #endif /* CONFIG_AMD_MEM_ENCRYPT */
 
-/*
- * hv_map_memory - map memory to extra space in the AMD SEV-SNP Isolation VM.
  }
 
- if (hv_isolation_type_snp()) {
-  vaddr = hv_map_memory(net_device-&amp;gt;recv_buf, buf_size);
</description>
    </item>
    <item>
      <title>[Patch v4 06/13] x86/hyperv: Change vTOM handling to use standard  ...</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1392</link>
      <description>Michael Kelley writes: (Summary)   3 ---
 8 files changed, 78 insertions(+), 50 deletions(-)

diff --git a/arch/x86/coco/core.c b/arch/x86/coco/core.c
index 49b44f8..c361c52 100644
--- a/arch/x86/coco/core.c
+++ b/arch/x86/coco/core.c
@@ -44,6 +44,24 @@ static bool intel_cc_platform_has(enum cc_attr attr)
 static bool amd_cc_platform_has(enum cc_attr attr)
 {
 #ifdef CONFIG_AMD_MEM_ENCRYPT
+
+ /*
+  * Handle the SEV-SNP vTOM case where sme_me_mask must be zero,
+  * and the other levels of SME/SEV functionality, including C-bit
+  * based SEV-SNP, must not be enabled.
</description>
    </item>
    <item>
      <title>[Patch v4 03/13] Drivers: hv: Explicitly request decrypted in vmap ...</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1391</link>
      <description>Michael Kelley writes: (Summary)  2 +-
 2 files changed, 2 insertions(+), 2 deletions(-)

diff --git a/arch/x86/hyperv/ivm.c b/arch/x86/hyperv/ivm.c
index f33c67e..e8be4c2 100644
--- a/arch/x86/hyperv/ivm.c
+++ b/arch/x86/hyperv/ivm.c
@@ -343,7 +343,7 @@ void *hv_map_memory(void *addr, unsigned long size)
   pfns[i] = vmalloc_to_pfn(addr + i * PAGE_SIZE) +
    (ms_hyperv.shared_gpa_boundary &amp;gt;&amp;gt;
diff --git a/drivers/hv/ring_buffer.c b/drivers/hv/ring_buffer.c
index c6692fd..57667b29 100644
--- a/drivers/hv/ring_buffer.c
+++ b/drivers/hv/ring_buffer.c
@@ -211,7 +211,7 @@ int hv_ringbuffer_init(struct hv_ring_buffer_info *ring_info,
 
   ring_info-&amp;gt;ring_buffer = (struct hv_ring_buffer *)
    vmap_pfn(pfns_wraparound, page_cnt * 2 - 1,
-     PAGE_KERNEL);
</description>
    </item>
    <item>
      <title>[Patch v4 02/13] x86/hyperv: Reorder code in prep for subsequent patch</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1390</link>
      <description>Michael Kelley writes: (Summary) 
-
-/*
- * hv_is_isolation_supported - Check system runs in the Hyper-V
- * isolation VM.
- */
-bool hv_is_isolation_supported(void)
-{
- if (!cpu_feature_enabled(X86_FEATURE_HYPERVISOR))
-  return false;
-
-/*
- * hv_isolation_type_snp - Check system runs in the AMD SEV-SNP based
- * isolation VM.
+
+/*
+ * hv_isolation_type_snp - Check system runs in the AMD SEV-SNP based
+ * isolation VM.
</description>
    </item>
    <item>
      <title>Re: [PATCH v2] crypto/caam: Avoid GCC constprop bug warning</title>
      <author>Eric Biggers &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1389</link>
      <description>Eric Biggers writes: On Thu, Dec 01, 2022 at 07:23:49PM -0800, Kees Cook wrote:

limitation, given that "zero size to/from NULL" is perfectly valid.
No, that is undefined behavior.  Which is presumably the reason for the nonnull
annotation.  Anyway, it is silly, which is why I'd hope that someone would have
added an option to disable this C standard bug by now...
added an option to disable this C standard bug by now...
- Eric&lt;br/&gt;
- Eric&lt;br/&gt;
- Eric&lt;br/&gt;
</description>
    </item>
    <item>
      <title>[Patch v4 01/13] x86/ioapic: Gate decrypted mapping on cc_platform ...</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1388</link>
      <description>Michael Kelley writes: (Summary)  12 ++++++++++++
 2 files changed, 14 insertions(+), 1 deletion(-)

diff --git a/arch/x86/kernel/apic/io_apic.c b/arch/x86/kernel/apic/io_apic.c
index a868b76..2b70e2e 100644
--- a/arch/x86/kernel/apic/io_apic.c
+++ b/arch/x86/kernel/apic/io_apic.c
@@ -2686,7 +2686,8 @@ static void io_apic_set_fixmap(enum fixed_addresses idx, phys_addr_t phys)
   * Ensure fixmaps for IOAPIC MMIO respect memory encryption pgprot
   * bits, just like normal ioremap():
   */
- flags = pgprot_decrypted(flags);
   */
  CC_ATTR_HOTPLUG_DISABLED,
+
+ /**
+  * @CC_ATTR_ACCESS_IOAPIC_ENCRYPTED: Guest VM IO-APIC is encrypted
+  *
+  * The platform/OS is running as a guest/virtual machine with
+  * an IO-APIC that is emulated by a paravisor running in the
+  * guest VM context.
</description>
    </item>
    <item>
      <title>[Patch v4 00/13] Add PCI pass-thru support to Hyper-V Confidential VMs</title>
      <author>Michael Kelley &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1387</link>
      <description>Michael Kelley writes: (Summary)  [Boris Petkov]

* Patch 8: Use bitwise OR to pick up the vTOM bit in
  shared_gpa_boundary rather than adding it

Changes in v3:
* Patch 1: Tweak the code fix to cleanly separate the page
  alignment and physical address masking [Dave Hansen]

* Patch 2: Change the name of the new CC_ATTR that controls
  whether the IO-APIC is mapped decrypted [Dave Hansen]

* Patch 5 (now patch 7): Add CC_ATTR_MEM_ENCRYPT to what
  Hyper-V vTOM reports as 'true'.
</description>
    </item>
    <item>
      <title>linux-next: boot failure after merge of the powerpc tree</title>
      <author>Stephen Rothwell &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1386</link>
      <description>Stephen Rothwell writes: (Summary)   CR: 22004220  XER: 00000000
CFAR: c000000000070508 DAR: 000000000000001c DSISR: 00080000 IRQMASK: 3 
GPR00: c000000000e06718 c000000002773a10 c00000000116fc00 0000000000000000 
GPR04: 0000000000002900 0000000000002800 0000000000000000 0000000000000000 
GPR08: 000000000000000e c0000000027afc00 0000000000000000 0000000000004000 
GPR12: c00000000047e970 c000000002950000 0000000000000000 00000000013c8ff0 
GPR16: 000000000000000d 0000000002be00d0 0000000000000001 00000000013c8e60 
GPR20: 00000000013c8fa8 00000000013c8d90 c0000000027b2160 0000000000000000 
GPR24: 0000000000000005 c0000000027b3568 c000000000e06718 0000000000002900 
GPR28: 0000000000002900 0000000007fff33f 0000000000000000 c000000002773bc8 
NIP [c00000000047e9bc] kmem_cache_alloc+0x5c/0x610
LR [c000000000e06718] mas_alloc_nodes+0xe8/0x350
Call Trace:
[c000000002773a10] [0040000000000000] 0x40000000000000 (unreliable)
[c000000002773a70] [c000000000e06718] mas_alloc_nodes+0xe8/0x350
[c000000002773ad0] [c000000000e0f7f4] mas_expected_entries+0x94/0x11</description>
    </item>
    <item>
      <title>Re: [PATCH v2] crypto/caam: Avoid GCC constprop bug warning</title>
      <author>Kees Cook &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1385</link>
      <description>Kees Cook writes: On Fri, Dec 02, 2022 at 10:50:48AM +0800, Herbert Xu wrote:

been fixed so that it doesn't warn without the if clause.
It's _GCC_, not sparse, that is enforcing the nonnull argument
attribute.&lt;br/&gt;
attribute.&lt;br/&gt;

get rid of it once and for all.&lt;br/&gt;
Getting rid of the if doesn't solve the warning. I can switch it to just
"if (data)", though. That keeps GCC happy.

-- 
Kees Cook


</description>
    </item>
    <item>
      <title>Re: [RFC PATCH v2] mm: Add nodes= arg to memory.reclaim</title>
      <author>"Huang, Ying" &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1384</link>
      <description>&amp;quot;Huang, Ying&amp;quot; writes: Mina Almasry &amp;lt;almasrymina@google.com&amp;gt; writes:
Mina Almasry &amp;lt;almasrymina@google.com&amp;gt; writes:

+		match_strlcpy(value, args, sizeof(value));&lt;br/&gt;
Per my understanding, we don't need to copy the string, because strsep()
has replaced " " with "\0".  Right?
has replaced " " with "\0".  Right?
Best Regards,&lt;br/&gt;
Huang, Ying&lt;br/&gt;
Huang, Ying&lt;br/&gt;

2.38.1.584.g0f3c55d4c2-goog&lt;br/&gt;
2.38.1.584.g0f3c55d4c2-goog&lt;br/&gt;
</description>
    </item>
    <item>
      <title>[PATCH] ipvs: initialize 'ret' variable in do_ip_vs_set_ctl()</title>
      <author>Li Qiong &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1383</link>
      <description>Li Qiong writes: (Summary) The 'ret' should need to be initialized to 0, in case
return a uninitialized value because no default process
for "switch (cmd)".&lt;br/&gt;
for "switch (cmd)".&lt;br/&gt;
Signed-off-by: Li Qiong &amp;lt;liqiong@nfschina.com&amp;gt; 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/net/netfilter/ipvs/ip_vs_ctl.c b/net/netfilter/ipvs/ip_vs_ctl.c
index 988222fff9f0..4b20db86077c 100644
--- a/net/netfilter/ipvs/ip_vs_ctl.c
+++ b/net/netfilter/ipvs/ip_vs_ctl.c
@@ -2456,7 +2456,7 @@ static int
 do_ip_vs_set_ctl(struct sock *sk, int cmd, sockptr_t ptr, unsigned int len)
 {
  struct net *net = sock_net(sk);
</description>
    </item>
    <item>
      <title>RE: [PATCH v2 1/1] iio: imx8qxp-adc: fix irq flood when call imx8q ...</title>
      <author>Bough Chen &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1382</link>
      <description>Bough Chen writes: (Summary) PiAtLS0tLU9yaWdpbmFsIE1lc3NhZ2UtLS0tLQ0KPiBGcm9tOiBGcmFuayBMaSA8ZnJhbmsubGlA
bnhwLmNvbT4NCj4gU2VudDogMjAyMsTqMTLUwjHI1SAyMjowMQ0KPiBUbzogQm91Z2ggQ2hlbiA8
aGFpYm8uY2hlbkBueHAuY29tPg0KPiBDYzogY2FpLmh1b3FpbmdAbGludXguZGV2OyBmZXN0ZXZh
bUBnbWFpbC5jb207IEZyYW5rIExpIDxmcmFuay5saUBueHAuY29tPjsNCj4gaW14QGxpc3RzLmxp
bnV4LmRldjsgamljMjNAa2VybmVsLm9yZzsga2VybmVsQHBlbmd1dHJvbml4LmRlOw0KPiBsYXJz
QG1ldGFmb28uZGU7IGxpbnV4LWFybS1rZXJuZWxAbGlzdHMuaW5mcmFkZWFkLm9yZzsNCj4gbGlu
dXgtaWlvQHZnZXIua2VybmVsLm9yZzsgZGwtbGludXgtaW14IDxsaW51eC1pbXhAbnhwLmNvbT47
DQo+IGxpbnV4LWtlcm5lbEB2Z2VyLmtlcm5lbC5vcmc7IHMuaGF1ZXJAcGVuZ3V0cm9uaXguZGU7
IHNoYXduZ3VvQGtlcm5lbC5vcmcNCj4gU3ViamVjdDogW1BBVENIIHYyIDEvMV0gaWlvOiBpbXg4
cXhwLWFkYzogZml4IGlycSBmbG9vZCB3aGVuIGNhbGwNCj4gaW14OHF4cF9hZGNfcmVhZF9yYXco
KQ0KPiANCj4gaXJxIGZsb29kIGhhcHBlbiB3aGVuIHJ1bg0KPiAgICAgY2F0IC9zeXMvYnVzL2lp
by9kZXZpY2VzL2lpbzpkZXZpY2UwL2luX3ZvbHRhZ2UxX3Jhdw0KPiANCj4gaW14OHF4cF9hZGNf
cmVhZF9yYXcoKQ0KPiB7DQo+IAkuLi4NCj4gCWVuYWJsZSBpcnENCj4gCS8qIGFkYyBzdGFydCAq
Lw0KPiAJd3JpdGVsKDEsIGF</description>
    </item>
    <item>
      <title>Re: [PATCH v2] crypto/caam: Avoid GCC constprop bug warning</title>
      <author>Kees Cook &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1381</link>
      <description>Kees Cook writes: On Thu, Dec 01, 2022 at 07:18:15PM -0800, Eric Biggers wrote:

behavior" thing?  It's basically a bug in the C standard.
It's not undefined -- it's just pedantic. __builtin_memcpy is defined
internally to GCC with __attribute__((nonnull (1, 2))), and since it can
find a path from an always-NULL argument, it warns. I think it's a dumb
limitation, given that "zero size to/from NULL" is perfectly valid.
limitation, given that "zero size to/from NULL" is perfectly valid.

</description>
    </item>
    <item>
      <title>Re: [RFC PATCH v2 0/2] sched/fair: Choose the CPU where short task ...</title>
      <author>K Prateek Nayak &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1380</link>
      <description>K Prateek Nayak writes: (Summary) Hello Chenyu,&lt;br/&gt;
Hello Chenyu,&lt;br/&gt;
On 11/30/2022 9:33 AM, Chen Yu wrote:&lt;br/&gt;

Thank you Prateek, and sorry for late response. Thank you for the detailed explanation and the
visualization of the bottleneck in v3 Patch 2.&lt;br/&gt;
visualization of the bottleneck in v3 Patch 2.&lt;br/&gt;

result and we can discuss on that then.&lt;br/&gt;
I've queued up runs for v3 with the same set of benchmarks reported
above. I will make a point to include results with C2 and turbo disabled
to reduce external variables.&lt;br/&gt;
I'll share the results on v3 in the coming week.&lt;br/&gt;
--&lt;br/&gt;
Thanks and Regards,&lt;br/&gt;
Prateek&lt;br/&gt;
Prateek&lt;br/&gt;
Prateek&lt;br/&gt;

</description>
    </item>
    <item>
      <title>Re: [PATCH v2 2/3] selftests: cgroup: refactor proactive reclaim c ...</title>
      <author>Yosry Ahmed &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1379</link>
      <description>Yosry Ahmed writes: (Summary)  Sent
v3 with the suggested refactoring (+ the missing check for false
positives) squashed into this patch. 3 (patch 2 was almost rewritten according to your
suggestions, so I dropped the review tag and added a suggested tag):
suggestions, so I dropped the review tag and added a suggested tag):
&lt;a href="https://lore.kernel.org/lkml/20221202031512.1365483-1-yosryahmed@google.com/"&gt;https://lore.kernel.org/lkml/20221202031512.1365483-1-yosryahmed@google.com/&lt;/a&gt;
&lt;a href="https://lore.kernel.org/lkml/20221202031512.1365483-1-yosryahmed@google.com/"&gt;https://lore.kernel.org/lkml/20221202031512.1365483-1-yosryahmed@google.com/&lt;/a&gt;
Thanks!&lt;br/&gt;
Thanks!&lt;br/&gt;
Thanks!&lt;br/&gt;

</description>
    </item>
    <item>
      <title>[bug-report] WARNING in sched_tick_remote</title>
      <author>Hui Tang &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1378</link>
      <description>Hui Tang writes: (Summary) 

WARN log as follows:

WARNING: CPU: 2 PID: 23866 at kernel/sched/core.c:4142 queued_spin_lock arch/arm64/include/asm/paravirt.h:51 [inline]
WARNING: CPU: 2 PID: 23866 at kernel/sched/core.c:4142 do_raw_spin_lock include/linux/spinlock.h:183 [inline]
WARNING: CPU: 2 PID: 23866 at kernel/sched/core.c:4142 __raw_spin_lock_irq include/linux/spinlock_api_smp.h:129 [inline]
WARNING: CPU: 2 PID: 23866 at kernel/sched/core.c:4142 rq_lock_irq kernel/sched/sched.h:1373 [inline]
WARNING: CPU: 2 PID: 23866 at kernel/sched/core.c:4142 sched_tick_remote+0x384/0x400 kernel/sched/core.c:4129
Modules linked in:
CPU: 2 PID: 23866 Comm: kworker/u8:3 Not tainted 5.10.0-02029-gf83322d59c08-dirty #1
Hardware name: linux,dummy-virt (DT)
Workqueue: events_unbound sched_tick_remote
pstate: 20400085 (nzCv daIf +PAN -UAO -TCO BTYPE=--)
pc : sched_tick_remote+0x384/0x400 kernel/sched/core.c:4142
lr : sched_tick_remote+0x1e4/0x400 kernel/sched/core.c:4141
sp : ffffa00019347ba0
x29: ffffa00019347ba0 x28: ffff0000e2a8c110
x27: 0000000000</description>
    </item>
    <item>
      <title>[syzbot] WARNING in path_openat</title>
      <author>syzbot &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1377</link>
      <description>syzbot writes: (Summary)  !rwsem_test_oflags(sem, RWSEM_NONSPINNABLE)): count = 0x0, magic = 0xffff8880471d2810, owner = 0x0, curr 0xffff88802277d7c0, list empty
WARNING: CPU: 0 PID: 16685 at kernel/locking/rwsem.c:1361 __up_write kernel/locking/rwsem.c:1360 [inline]
WARNING: CPU: 0 PID: 16685 at kernel/locking/rwsem.c:1361 up_write+0x4f9/0x580 kernel/locking/rwsem.c:1615
Modules linked in:
CPU: 0 PID: 16685 Comm: syz-executor.0 Not tainted 6.1.0-rc6-syzkaller-00375-gcf562a45a0d5 #0
Hardware name: Google Google Compute Engine/Google Compute Engine, BIOS Google 10/26/2022
RIP: 0010:__up_write kernel/locking/rwsem.c:1360 [inline]
RIP: 0010:up_write+0x4f9/0x580 kernel/locking/rwsem.c:1615
Code: c7 40 a3 ed 8a 48 c7 c6 e0 a5 ed 8a 48 8b 54 24 28 48 8b 4c 24 18 4d 89 e0 4c 8b 4c 24 30 31 c0 53 e8 1b 83 e8 ff 48 83 c4 08 &amp;lt;0f&amp;gt;
</description>
    </item>
    <item>
      <title>Re: [PATCH v2] crypto/caam: Avoid GCC constprop bug warning</title>
      <author>Eric Biggers &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1376</link>
      <description>Eric Biggers writes: (Summary) On Thu, Dec 01, 2022 at 05:04:14PM -0800, Kees Cook wrote:

check to avoid warnings about memcpy() having a NULL argument:
Is there a gcc option to turn off the "memcpy with NULL and len=0 is undefined
behavior" thing?  It's basically a bug in the C standard.
Note that the kernel already uses options that make other types of undefined
behavior defined: -fno-strict-overflow, -fno-strict-aliasing, and
-fno-delete-null-pointer-checks.&lt;br/&gt;
-fno-delete-null-pointer-checks.&lt;br/&gt;
- Eric&lt;br/&gt;
- Eric&lt;br/&gt;
- Eric&lt;br/&gt;

</description>
    </item>
    <item>
      <title>[PATCH v3 3/3] selftests: cgroup: make sure reclaim target memcg i ...</title>
      <author>Yosry Ahmed &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1375</link>
      <description>Yosry Ahmed writes: (Summary) 
+
 /*
  * First, this test creates the following hierarchy:
  * A       memory.min = 0,    memory.max = 200M
@@ -266,6 +268,12 @@ static int cg_test_proc_killed(const char *cgroup)
  * unprotected memory in A available, and checks that:
  * a) memory.min protects pagecache even in this case,
  * b) memory.low allows reclaiming page cache with low events.
+ *
+ * Then we try to reclaim from A/B/C using memory.reclaim until its
+ * usage reaches 10M.
</description>
    </item>
    <item>
      <title>[PATCH v3 2/3] selftests: cgroup: refactor proactive reclaim code  ...</title>
      <author>Yosry Ahmed &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1374</link>
      <description>Yosry Ahmed writes: (Summary) 
+ *
+ * This function assumes that writing to memory.reclaim is the only
+ * source of change in memory.current (no concurrent allocations or
+ * reclaim).
-
-  /*
-   * We only keep looping if we get EAGAIN, which means we could
-   * not reclaim the full amount.
-  if (!err) {
-   /*
-    * If writing succeeds, then the written amount should have been
-    * fully reclaimed (and maybe more).
-  }
-
-  /* The kernel could not reclaim the full amount, try again.
</description>
    </item>
    <item>
      <title>[PATCH v3 1/3] mm: memcg: fix stale protection of reclaim target memcg</title>
      <author>Yosry Ahmed &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1373</link>
      <description>Yosry Ahmed writes: (Summary) 
 }
 
-static inline bool mem_cgroup_below_low(struct mem_cgroup *memcg)
+static inline bool mem_cgroup_below_low(struct mem_cgroup *target,
+     struct mem_cgroup *memcg)
 {
- if (!mem_cgroup_supports_protection(memcg))
+ if (mem_cgroup_unprotected(target, memcg))
   return false;
 }
 
-static inline bool mem_cgroup_below_min(struct mem_cgroup *memcg)
+static inline bool mem_cgroup_below_min(struct mem_cgroup *target,
+     struct mem_cgroup *memcg)
 {
- if (!mem_cgroup_supports_protection(memcg))
+ if (mem_cgroup_unprotected(target, memcg))
   return false;
-  } else if (mem_cgroup_below_low(memcg)) {
+  } else if (mem_cgroup_below_low(target_memcg, memcg)) {
    /*
     * Soft protection.
</description>
    </item>
    <item>
      <title>[PATCH v3 0/3] mm: memcg: fix protection of reclaim target memcg</title>
      <author>Yosry Ahmed &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1372</link>
      <description>Yosry Ahmed writes: (Summary) This series fixes a bug in calculating the protection of the reclaim
target memcg where we end up using stale effective protection values from
the last reclaim operation, instead of completely ignoring the
protection of the reclaim target as intended.
Yosry Ahmed (3):&lt;br/&gt;
  mm: memcg: fix stale protection of reclaim target memcg
  selftests: cgroup: refactor proactive reclaim code to reclaim_until()
  selftests: cgroup: make sure reclaim target memcg is unprotected
  selftests: cgroup: make sure reclaim target memcg is unprotected
 include/linux/memcontrol.h                    |
</description>
    </item>
    <item>
      <title>[PATCH resend] chardev: fix error handling in cdev_device_add()</title>
      <author>Yang Yingliang &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1371</link>
      <description>Yang Yingliang writes: (Summary) While doing fault injection test, I got the following report:
While doing fault injection test, I got the following report:
------------[ cut here ]------------
kobject: '(null)' (0000000039956980): is not initialized, yet kobject_put() is being called. 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/fs/char_dev.c b/fs/char_dev.c
index ba0ded7842a7..3f667292608c 100644
--- a/fs/char_dev.c
+++ b/fs/char_dev.c
@@ -547,7 +547,7 @@ int cdev_device_add(struct cdev *cdev, struct device *dev)
  }
 
  rc = device_add(dev);
</description>
    </item>
    <item>
      <title>[PATCH v2] hfs: Fix OOB Write in hfs_asc2mac</title>
      <author>Peng Zhang &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1370</link>
      <description>Peng Zhang writes: (Summary) From: ZhangPeng &amp;lt;zhangpeng362@huawei.com&amp;gt;&lt;br/&gt;
From: ZhangPeng &amp;lt;zhangpeng362@huawei.com&amp;gt;&lt;br/&gt;
Syzbot reported a OOB Write bug:&lt;br/&gt;
Syzbot reported a OOB Write bug:&lt;br/&gt;
loop0: detected capacity change from 0 to 64&lt;br/&gt;
==================================================================
BUG: KASAN: slab-out-of-bounds in hfs_asc2mac+0x467/0x9a0
fs/hfs/trans.c:133
Write of size 1 at addr ffff88801848314e by task syz-executor391/3632

Call Trace:
 &amp;lt;TASK&amp;gt; 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/fs/hfs/trans.c b/fs/hfs/trans.c
index 39f5e343bf4d..fdb0edb8a607 100644
--- a/fs/hfs/trans.c
+++ b/fs/hfs/trans.c
@@ -109,7 +109,7 @@ void hfs_asc2mac(struct super_block *sb, struct hfs_name *out, const struct qstr
  if (nls_io) {
   wchar_t ch;
</description>
    </item>
    <item>
      <title>RE: Intel timed i/o driver in HTE</title>
      <author>"N, Pandith" &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1369</link>
      <description>&amp;quot;N, Pandith&amp;quot; writes: (Summary) DQoNCj4gLS0tLS1PcmlnaW5hbCBNZXNzYWdlLS0tLS0NCj4gRnJvbTogRGlwZW4gUGF0ZWwgPGRp
cGVucEBudmlkaWEuY29tPg0KPiBTZW50OiBXZWRuZXNkYXksIE5vdmVtYmVyIDMwLCAyMDIyIDg6
NTQgQU0NCj4gVG86IExpbnVzIFdhbGxlaWogPGxpbnVzLndhbGxlaWpAbGluYXJvLm9yZz47IE4s
IFBhbmRpdGgNCj4gPHBhbmRpdGgubkBpbnRlbC5jb20+DQo+IENjOiBsaW51eC1rZXJuZWxAdmdl
ci5rZXJuZWwub3JnOyBIYWxsLCBDaHJpc3RvcGhlciBTDQo+IDxjaHJpc3RvcGhlci5zLmhhbGxA
aW50ZWwuY29tPjsgR3Jvc3MsIE1hcmsgPG1hcmsuZ3Jvc3NAaW50ZWwuY29tPjsNCj4gU2FuZ2Fu
bmF2YXIsIE1hbGxpa2FyanVuYXBwYSA8bWFsbGlrYXJqdW5hcHBhLnNhbmdhbm5hdmFyQGludGVs
LmNvbT47DQo+IEQsIExha3NobWkgU293amFueWEgPGxha3NobWkuc293amFueWEuZEBpbnRlbC5j
b20+OyBUIFIsIFRoZWplc2ggUmVkZHkNCj4gPHRoZWplc2gucmVkZHkudC5yQGludGVsLmNvbT47
IGFuZHJpeS5zaGV2Y2hlbmtvQGxpbnV4LmludGVsLmNvbTsNCj4gdGltZXN0YW1wQGxpc3RzLmxp
bnV4LmRldg0KPiBTdWJqZWN0OiBSZTogSW50ZWwgdGltZWQgaS9vIGRyaXZlciBpbiBIVEUNCj4g
DQo+IE9uIDExLzIzLzIyIDE6MjIgUE0sIExpbnVzIFdhbGxlaWogd3JvdGU6DQo+ID4gT24gV2Vk
LCBOb3YgMjMsIDIwMjIgYXQgMzozOCBQTSBOLCBQYW5kaXRoIDxwYW5kaXRoLm5AaW50ZWwuY29t
Pg0KPiB3cm90ZToNCj4gPg0</description>
    </item>
    <item>
      <title>Re: [PATCH v1 1/7] dt-bindings: net: snps,dwmac: Add compatible st ...</title>
      <author>yanhong wang &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1368</link>
      <description>yanhong wang writes: 

On 2022/12/2 0:18, Krzysztof Kozlowski wrote:&lt;br/&gt;

Drop full stop from subject and add it here instead.
Will update in the next version.&lt;br/&gt;
Will update in the next version.&lt;br/&gt;

Two people contributed this one single line?&lt;br/&gt;
Emil made this patch and I submitted it.&lt;br/&gt;
Emil made this patch and I submitted it.&lt;br/&gt;

Krzysztof&lt;br/&gt;
Krzysztof&lt;br/&gt;
</description>
    </item>
    <item>
      <title>[PATCH resend] regulator: core: fix resource leak in regulator_reg ...</title>
      <author>Yang Yingliang &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1367</link>
      <description>Yang Yingliang writes: (Summary) I got some resource leak reports while doing fault injection test:
I got some resource leak reports while doing fault injection test:
  OF: ERROR: memory leak, expected refcount 1 instead of 100,
  of_node_get()/of_node_put() unbalanced - destroy cset entry:
  attach overlay node /i2c/pmic@64/regulators/buck1&lt;br/&gt;
  attach overlay node /i2c/pmic@64/regulators/buck1&lt;br/&gt;
unreferenced object 0xffff88810deea000 (size 512):
  comm "490-i2c-rt5190a", pid 253, jiffies 4294859840 (age 5061.046s)
  hex dump (first 32 bytes):
    00 00 00 00 ad 4e ad de ff ff ff ff 00 00 00 00  .....N..........
</description>
    </item>
    <item>
      <title>Re: [PATCH v2] crypto/caam: Avoid GCC constprop bug warning</title>
      <author>Herbert Xu &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1366</link>
      <description>Herbert Xu writes: (Summary) On Thu, Dec 01, 2022 at 05:04:14PM -0800, Kees Cook wrote:

   memcpy(offset, data, len);&lt;br/&gt;
This makes no sense.  The if clause was added to silence sparse.
That then in turn caused gcc to barf.  However, sparse has since
been fixed so that it doesn't warn without the if clause.
been fixed so that it doesn't warn without the if clause.
The solution is not to keep adding crap to the if clause, but to
get rid of it once and for all.&lt;br/&gt;
get rid of it once and for all.&lt;br/&gt;
Thanks,&lt;br/&gt;


</description>
    </item>
    <item>
      <title>RE: [PATCH V2 04/11] cxl/mem: Clear events on driver load</title>
      <author>Dan Williams &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1365</link>
      <description>Dan Williams writes: (Summary) cxl/mem is cxl_mem.ko, This is cxl/pci.&lt;br/&gt;
cxl/mem is cxl_mem.ko, This is cxl/pci.&lt;br/&gt;
ira.weiny@ wrote:&lt;br/&gt;

anyone listening to it at driver load time.&lt;br/&gt;
This is easy to guarantee with modprobe policy, so I am not sure it is
worth stating.&lt;br/&gt;
worth stating.&lt;br/&gt;
This breakdown feels odd. Then squash get, clear, and this patch into one
patch as they don't have much reason to go in separately.

+&lt;br/&gt;
This hunk likely goes with the first patch that actually implements some
mocked events.&lt;br/&gt;
mocked events.&lt;br/&gt;

2.37.2&lt;br/&gt;
2.37.2&lt;br/&gt;
2.37.2&lt;br/&gt;

</description>
    </item>
    <item>
      <title>Re: [PATCH v1] mm: disable top-tier fallback to reclaim on proacti ...</title>
      <author>"Huang, Ying" &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1364</link>
      <description>&amp;quot;Huang, Ying&amp;quot; writes: (Summary)  +   * goto retry to reclaim the undemoted folios in folio_list if
&amp;gt; +   * Reclaiming directly from top tier nodes is not often desired
&amp;gt; +   * due to it breaking the LRU ordering: in general memory
&amp;gt; +   * should be reclaimed from lower tier nodes and demoted from
&amp;gt; +   * However, disabling reclaim from top tier nodes entirely
&amp;gt; +   * would cause ooms in edge scenarios where lower tier memory
&amp;gt; +   * from top tier nodes in proactive reclaim though as that is
&amp;gt;
</description>
    </item>
    <item>
      <title>[PATCH -next v2] blk-cgroup: Fix some kernel-doc comments</title>
      <author>Yang Li &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1363</link>
      <description>Yang Li writes: (Summary)  2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/block/blk-cgroup.c b/block/blk-cgroup.c
index 1bb939d3b793..77f44472b41e 100644
--- a/block/blk-cgroup.c
+++ b/block/blk-cgroup.c
@@ -1831,7 +1831,7 @@ void blkcg_maybe_throttle_current(void)
 
 /**
  * blkcg_schedule_throttle - this task needs to check for throttling
- * @gendisk: disk to throttle
+ * @disk: disk to throttle
  * @use_memdelay: do we charge this to memory delay for PSI
  *
  * This is called by the IO controller when we know there's delay accumulated
-- 
2.20.1.7.g153144c
&lt;br/&gt;

</description>
    </item>
    <item>
      <title>[PATCH linux-next v2] pxa: Remove dev_err() after platform_get_irq()</title>
      <author>&lt;zhang.songyi@zte ... &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1362</link>
      <description>   &amp;lt;zhang.songyi@zte ... writes: (Summary) From: zhang songyi &amp;lt;zhang.songyi@zte.com.cn&amp;gt;&lt;br/&gt;
From: zhang songyi &amp;lt;zhang.songyi@zte.com.cn&amp;gt;&lt;br/&gt;
There is no need to call the dev_err() function directly to print a
custom message when handling an error from either the platform_get_irq()
or platform_get_irq_byname() functions as both are going to display an
appropriate error message in case of a failure.&lt;br/&gt;
appropriate error message in case of a failure.&lt;br/&gt;
Signed-off-by: zhang songyi &amp;lt;zhang.songyi@zte.com.cn&amp;gt; 4 +---
 1 file changed, 1 insertion(+), 3 deletions(-)

diff --git a/drivers/soc/pxa/ssp.c b/drivers/soc/pxa/ssp.c
index 93449fb3519e..bd029e838241 100644
--- a/drivers/soc/pxa/ssp.c
+++ b/drivers/soc/pxa/ssp.c
@@ -146,10 +146,8 @@ static int pxa_ssp_probe(struct platform_device *pdev)
  }

  ssp-&amp;gt;irq = platform_get_irq(pdev, 0);
</description>
    </item>
    <item>
      <title>Re: [PATCH] mmc: sdhci-sprd: remove prefer asynchronous probe</title>
      <author>Wenchao Chen &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1361</link>
      <description>Wenchao Chen writes: (Summary) 
Log:
[    1.714617][   T11] mmc1: SDHCI controller on 71400000.sdio
[71400000.sdio] using ADMA 64-bit
[    1.715276][    T9] mmc0: SDHCI controller on 71100000.sdio
[71100000.sdio] using ADMA 64-bit
[    1.884525][   T75] mmc1: Host Software Queue enabled
[    1.890965][   T75] mmc1: new HS400 Enhanced strobe MMC card at address 0001

But set prefer_asynchronous_probe, sometimes there will be sdio0:
sdio@71100000 is MMC1, sdio3: sdio@71400000 is MMC0. @@ -801,7 +801,6 @@ static struct platform_driver sdhci_sprd_driver = {
&amp;gt;
</description>
    </item>
    <item>
      <title>[PATCH 5.4-] PM/devfreq: governor: Add a private governor_data for ...</title>
      <author>Kant Fan &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1360</link>
      <description>Kant Fan writes: (Summary)   7 ++++---
 3 files changed, 12 insertions(+), 13 deletions(-)

diff --git a/drivers/devfreq/devfreq.c b/drivers/devfreq/devfreq.c
index c79652ee94be..93efaf69d08e 100644
--- a/drivers/devfreq/devfreq.c
+++ b/drivers/devfreq/devfreq.c
@@ -603,8 +603,7 @@ static void devfreq_dev_release(struct device *dev)
  * @dev: the device to add devfreq feature.
  *
  * This function manages automatically the memory of devfreq device using device
  * resource management and simplify the free operation for memory of devfreq
diff --git a/drivers/devfreq/governor_userspace.c b/drivers/devfreq/governor_userspace.c
index af94942fcf95..a3ae4dc4668b 100644
--- a/drivers/devfreq/governor_userspace.c
+++ b/drivers/devfreq/governor_userspace.c
@@ -21,7 +21,7 @@ struct userspace_data {
 
 static int devfreq_userspace_func(struct devfreq *df, unsigned long *freq)
 {
- struct userspace_data *data = df-&amp;gt;data;
</description>
    </item>
    <item>
      <title>Re: [PATCH 1/5] sbitmap: don't consume nr for inactive waitqueue t ...</title>
      <author>Kemeng Shi &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1359</link>
      <description>Kemeng Shi writes: 

on 12/2/2022 8:58 AM, Jens Axboe wrote:&lt;br/&gt;

Thanks for explanation, so the patch seems fine as comment is present
already though it doesn't mention sting "waitqueue_active" directly.
No bother anymore, this patch will be dropped as the fixed code is
stale.&lt;br/&gt;
Thanks again.&lt;br/&gt;
Thanks again.&lt;br/&gt;

</description>
    </item>
    <item>
      <title>[PATCH linux-next v2] mmc: sdhci: Remove unneeded semicolon</title>
      <author>&lt;zhang.songyi@zte ... &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1358</link>
      <description>   &amp;lt;zhang.songyi@zte ... writes: (Summary) From: zhang songyi &amp;lt;zhang.songyi@zte.com.cn&amp;gt;&lt;br/&gt;
From: zhang songyi &amp;lt;zhang.songyi@zte.com.cn&amp;gt;&lt;br/&gt;
The semicolon after the "}" is unneeded. 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/drivers/mmc/host/sdhci.c b/drivers/mmc/host/sdhci.c
index 42aaeabcad22..8413180a1039 100644
--- a/drivers/mmc/host/sdhci.c
+++ b/drivers/mmc/host/sdhci.c
@@ -2289,7 +2289,7 @@ static bool sdhci_timing_has_preset(unsigned char timing)
  case MMC_TIMING_UHS_DDR50:
  case MMC_TIMING_MMC_DDR52:
   return true;
- };
</description>
    </item>
    <item>
      <title>[BUG] lockdep splat using mmio tracer</title>
      <author>Steven Rostedt &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1357</link>
      <description>Steven Rostedt writes: (Summary) 
[ 1111.130676] kworker/0:0/3433 [HC1[1]:SC0[0]:HE0:SE1] takes:
[ 1111.130679] d3dc2b90 (kmmio_lock){....}-{2:2}, at: kmmio_die_notifier+0x70/0x140
[ 1111.130690] {INITIAL USE} state was registered at:
[ 1111.130691]   lock_acquire+0xa2/0x2b0
[ 1111.130696]   _raw_spin_lock_irqsave+0x36/0x60 
[ 1111.130701]   register_kmmio_probe+0x43/0x210  
[ 1111.130704]   mmiotrace_ioremap+0x188/0x1b0
[ 1111.130706]   __ioremap_caller.constprop.0+0x257/0x340
[ 1111.130711]   ioremap_wc+0x12/0x20
[ 1111.130713]   ttm_bo_vmap+0x1d7/0x1f0 [ttm]
[ 1111.130722]   qxl_bo_vmap_locked+0x75/0xa0 [qxl]
[ 1111.130728]   qxl_draw_dirty_fb+0x2a2/0x440 [qxl]
[ 1111.130733]   qxl_framebuffer_surface_dirty+0xfb/0x1d0 [qxl]
[ 1111.130737]   drm_fb_helper_damage_work+0x181/0x350 [drm_kms_helper]
[ 1117.130757]   process_one_work+0x21a/0x4e0
[ 1111.130759]   worker_thread+0x14e/0x3a0
[ 1111.130761]   kthread+0xea/0x110
[ 1111.130765]   ret_from_fork+0x1c/0x28
[ 1111.130767] irq event stamp: 263958
[ 1111.130768] hardirqs last  enabled at (2</description>
    </item>
    <item>
      <title>RE: [PATCH V2 03/11] cxl/mem: Implement Clear Event Records command</title>
      <author>Dan Williams &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1356</link>
      <description>Dan Williams writes: (Summary) ira.weiny@ wrote:&lt;br/&gt;

Therefore each event is cleared specifically.&lt;br/&gt;
Note that the spec has a better reason for why Clear All has limited
usage:&lt;br/&gt;
usage:&lt;br/&gt;
"Clear All Events is only allowed when the Event Log has overflowed; @total is a duplicate of
@get_pl-&amp;gt;record_count, and the 2 loops feel like it could be cut
down to one.&lt;br/&gt;
down to one.&lt;br/&gt;

+   dev_dbg(cxlds-&amp;gt;dev, "Event log '%s': Clearning %u\n",
While I do think this operation is a mix of clearing and cleaning event
records, I don't think "Clearning" is a word.
</description>
    </item>
    <item>
      <title>[PATCH linux-next v2] mips/pci: use devm_platform_ioremap_resource()</title>
      <author>&lt;zhang.songyi@zte ... &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1355</link>
      <description>   &amp;lt;zhang.songyi@zte ... writes: (Summary) From: zhang songyi &amp;lt;zhang.songyi@zte.com.cn&amp;gt;&lt;br/&gt;
From: zhang songyi &amp;lt;zhang.songyi@zte.com.cn&amp;gt;&lt;br/&gt;
Use the devm_platform_ioremap_resource() helper instead of
calling platform_get_resource() and devm_ioremap_resource()
separately&lt;br/&gt;
separately&lt;br/&gt;
Signed-off-by: zhang songyi &amp;lt;zhang.songyi@zte.com.cn&amp;gt; 4 +---
 1 file changed, 1 insertion(+), 3 deletions(-)

diff --git a/arch/mips/pci/pci-rt3883.c b/arch/mips/pci/pci-rt3883.c
index e07ae098bdd8..d59888aaed81 100644
--- a/arch/mips/pci/pci-rt3883.c
+++ b/arch/mips/pci/pci-rt3883.c
@@ -404,7 +404,6 @@ static int rt3883_pci_probe(struct platform_device *pdev)
  struct rt3883_pci_controller *rpc;
</description>
    </item>
    <item>
      <title>[PATCH v2 3/3] arm64: kprobes: Return DBG_HOOK_ERROR if kprobes ca ...</title>
      <author>"Masami Hiramatsu (Google)" &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1353</link>
      <description>&amp;quot;Masami Hiramatsu (Google)&amp;quot; writes: (Summary) 
+ }
 
- if (p) {
-  if (cur_kprobe) {
-   if (reenter_kprobe(p, regs, kcb))
-    return;
-  } else {
-   /* Probe hit */
-   set_current_kprobe(p);  If we have a
-    * pre-handler and it returned non-zero, it will
-    * modify the execution path and no need to single
-    * stepping.
-  }
+ if (cur_kprobe) {
+  /* Hit a kprobe inside another kprobe */
+  if (!reenter_kprobe(p, regs, kcb))
+   return DBG_HOOK_ERROR;
</description>
    </item>
    <item>
      <title>[PATCH v2 2/3] arm64: kprobes: Let arch do_page_fault() fix up pag ...</title>
      <author>"Masami Hiramatsu (Google)" &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1352</link>
      <description>&amp;quot;Masami Hiramatsu (Google)&amp;quot; writes: (Summary)     8 --------
 1 file changed, 8 deletions(-)

diff --git a/arch/arm64/kernel/probes/kprobes.c b/arch/arm64/kernel/probes/kprobes.c
index c9e4d0720285..d2ae37f89774 100644
--- a/arch/arm64/kernel/probes/kprobes.c
+++ b/arch/arm64/kernel/probes/kprobes.c
@@ -294,14 +294,6 @@ int __kprobes kprobe_fault_handler(struct pt_regs *regs, unsigned int fsr)
   }
 
   break;
- case KPROBE_HIT_ACTIVE:
- case KPROBE_HIT_SSDONE:
-  /*
-   * In case the user-specified fault handler returned
-   * zero, try to fix up.
</description>
    </item>
    <item>
      <title>[PATCH v2 0/3] arm64: kprobes: Fix bugs in kprobes for arm64</title>
      <author>"Masami Hiramatsu (Google)" &lt;invalid@email.com&gt;</author>
      <link>http://lkml.org/lkml/2022/12/1/1351</link>
      <description>&amp;quot;Masami Hiramatsu (Google)&amp;quot; writes: (Summary) 
The [2/3] let do_page_fault() fixup the page fault in kprobes user
handler, and [3/3] is more like code cleanup and returns
DBG_HOOK_ERROR if it can not handle kprobe's BRK (but that
should not happen.)&lt;br/&gt;
should not happen.)&lt;br/&gt;
In this version I update to use noinstr and __always_inline [1/3]
and update comments[3/3]. Also add Mark's Ack (Thanks!)
Thank you,&lt;br/&gt;
Thank you,&lt;br/&gt;
---

Masami Hiramatsu (Google) (3):
      arm64: Prohibit instrumentation on arch_stack_walk()
      arm64: kprobes: Let arch do_page_fault() fix up page fault in user handler
      arm64: kprobes: Return DBG_HOOK_ERROR if kprobes can not handle a BRK


 arch/arm64/kernel/probes/kprobes.c |
</description>
    </item>
  </channel>
</rss>
