
# Homework 3 — Reduced models, Bode peaking, and prefilters

**Source:** AE511_HW3.pdf (2 pages). Three problems refer to a textbook whose problem statements were not supplied; the fourth depends on an aircraft model from Homework 2.

## Problems 1–3 — Textbook Problems 3.26, 3.30, and 3.37

The uploaded assignment gives **only the problem numbers**. Without the textbook questions, numerical answers would be inventions. Once the problem statements are available, use the corresponding lecture methods: identify poles/zeros, standardize second-order factors, estimate damping and transient metrics, then verify any approximations. This guide intentionally does not fabricate the missing statements.

## Problem 4 — Reduce a ninth-order aircraft model responsibly

The nine-pole elevator-to-pitch-rate model comes from Homework 2's separately supplied Simulink aircraft example; **its coefficients are absent from the files**. The following is a rigorous workflow, not a made-up aircraft result.

1. Use `pzmap` to inspect all poles and zeros, recording approximate cancellation pairs and pole real parts.
2. Identify poles with large negative real parts compared with the bandwidth of interest. A fast pole $-a$ contributes a step transient proportional to $e^{-at}$; its time scale is $1/a$. A fast pole alone is not automatically negligible when a zero creates a large residue.
3. Retain dominant poles and important zeros, then construct a reduced-order pole-zero-gain model.
4. Match the **signed DC gain**: for a candidate $G_r$, set its multiplier $k$ so $G_r(0)=G(0)$, provided $G(0)$ exists.
5. Compare the two step responses in the **same plot** and quantify maximum error, settling, overshoot, and steady-state gain.

For example, if an illustrative plant is $G(s)=10(s+20)/[(s+2)(s+18)(s+25)]$, a low-frequency approximation can replace the fast factor $(s+20)/[(s+18)(s+25)]$ by its value at zero, giving $G_r(s)=\frac{10\cdot20}{18\cdot25}\frac1{s+2}$. This is **an illustration, not the missing Beaver model**.

```matlab
% G9 must come from the supplied aircraft model, not from this PDF.
G9 = minreal(G9);
pzmap(G9); grid on;
% Gr: enter the explicitly chosen reduced pole-zero-gain model.
figure; step(G9,Gr); legend('Original ninth-order','Reduced');
grid on; title('Model-reduction step-response validation');
```

## Problem 5 — Resonance, noise, reference tracking, and prefilter design

The given closed-loop transfer function is

$$T(s)=\frac{100}{s^2+4s+100},\quad\omega_n=10,\quad\zeta=\frac4{20}=0.2.$$

It has unit DC gain. For $\zeta<1/\sqrt2$, the resonance frequency is $\omega_r=\omega_n\sqrt{1-2\zeta^2}=\sqrt{92}\approx9.59$ rad/s, and

$$M_r=\frac1{2\zeta\sqrt{1-\zeta^2}}\approx2.552\quad(8.14\text{ dB}).$$

**Reference:** $Y/R=T$, so the reference is magnified near $\omega_r$. **Sensor noise:** for the standard unity negative-feedback loop the sensor-noise path is $Y/N=-T$, giving the same magnitude peaking. Both exceed the assignment's 1-dB threshold. The claim depends on the standard feedback location of noise.

To make the reference response equal to

$$T_{\rm ideal}(s)=\frac{100}{s^2+16s+100},$$

insert a prefilter $F$ satisfying $FT=T_{\rm ideal}$. Hence

$$\boxed{F(s)=\frac{T_{\rm ideal}(s)}{T(s)}=\frac{s^2+4s+100}{s^2+16s+100}.}$$

This proper stable prefilter cancels the modeled poles/zeros algebraically in the **reference channel**, yielding $Y/R=T_{\rm ideal}$ with damping ratio $0.8$. It has unit DC gain, so tracking at steady state is unchanged. But a prefilter **does not appear in the sensor-feedback noise path**, so $Y/N=-T$ remains exactly the same (assuming unchanged inner loop). That is the key conceptual distinction tested in the last subquestion.

![Original and prefiltered responses](figures/hw03-prefilter.svg)

**Model caution.** Exact cancellation in an input prefilter assumes the estimated closed-loop model is exact. Errors leave residual transients, so do not present the prefilter as a robustness improvement.
