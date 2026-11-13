# Homework 08 — Source question statements

## Original question for section 1

Consider the unstable plant
$$G(s)=\frac{10}{s^2-1.5s+25}.$$

Use MATLAB `rlocus` to answer:

1. Can this plant be stabilized by **proportional** control?
2. Can it be stabilized by a **lead controller** $C(s)=K(s+5)/(s+50)$?
3. Choose $K$ to target **10% unit-step overshoot**. The original prompt notes that root-locus clicking can reveal nominal overshoot estimates.
4. Plot the actual closed-loop step response. Is measured overshoot close to 10%? If substantially different, explain **why**.

---

## Original question for section 2

**Problem 2, part 1.** Make both a **rough sketch** and a MATLAB **root-locus plot** for
$$G(s)=\frac{s-2}{s^2+10s+100}.$$

Show the root locus for **both negative and positive feedback**. Sketches may be drawn on a `pzmap` plot.

---

## Original question for section 3

**Problem 2, part 2.** Make rough sketch and MATLAB root-locus plot for the **negative-feedback** loop
$$G(s)=\frac{(s+2)(s^2+5s+25)}{(s-1)(s+30)(s^2+10s+100)}.$$

The assignment asks for the structure and direction of root-locus branches, not a particular feedback gain.

---

## Original question for section 4

**Problem 2, part 3.** Make rough sketch and MATLAB root-locus plot for the **negative-feedback** loop
$$G(s)=\frac{s-2}{(s+4)(s^2+3s+9)(s^2+20s+400)}.$$

Assume standard negative feedback, as stated in the problem instructions.

---

## Original question for section 5

The original assignment specifies **textbook-only** questions:

- **Problem 3:** “Problem 6.55 from the 7th edition of *Feedback Control of Dynamic Systems* by Franklin, Powell and Emami-Naeini.” For parts **h and i**, the prompt says the controller $D_c(s)$ is a **lead compensator with gain $K$**, and in part **e** MATLAB may be used for Nyquist.
- **Problem 4:** “Problem 6.64 from the 7th edition of *Feedback Control of Dynamic Systems* by Franklin, Powell and Emami-Naeini.”

The full textbook statements and diagrams were **not** included in the supplied PDF, so exact answers cannot be asserted.