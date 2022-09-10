<template>
  <div class="flex flex-wrap gap-y-1 items-center">
    <div
      class="bg-cottonBall dark:bg-hei-se-black rounded-full w-[100px] h-[10px] relative"
    >
      <div
        class="absolute w-px h-[10px] bg-white dark:bg-ruined-smores left-5"
      />
      <div
        class="absolute w-px h-[10px] bg-white dark:bg-ruined-smores right-5"
      />
      <div
        class="h-[10px] rounded-bl-full rounded-tl-full"
        :class="{
          'bg-mountain-meadow': isEarning && !isOverMax,
          'bg-candyGrapeFizz': isEarning && isOverMax,
          'bg-queer-blue dark:bg-bright-navy-blue': !isEarning,
        }"
        :style="{ width: barFill }"
      />
    </div>

    <div class="relative ml-[15px] mr-5">
      <img :src="hbarIcon">
      <img
        :src="statusIcon"
        class="absolute left-4 top-3"
      >
    </div>

    <div class="font-medium">
      {{ amountTo }}&nbsp;<span class="text-xs font-semibold">HBAR</span>
    </div>
  </div>
</template>

<script lang="ts">
import BigNumber from "bignumber.js";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import hbarBlack from "../../assets/hbar_circle.svg";
import hbarFaded from "../../assets/hbar_faded.svg";
import alertIcon from "../../assets/alert_circle.svg";
import checkIcon from "../../assets/checkmark_circle.svg";
import xIcon from "../../assets/x_circle.svg";

export default defineComponent({
    name: "StakingBar",
    props: {
        min: { type: BigNumber, required: true },
        max: { type: BigNumber, required: true },
        current: { type: BigNumber, required: true },
    },
    setup(props) {
        const { t } = useI18n();
        const isEarning = computed(() =>
            props.current.isGreaterThanOrEqualTo(props.min)
        );
        const isOverMax = computed(() =>
            props.current.isGreaterThan(props.max)
        );
        const amountTo = computed(() => {
            if (!isEarning.value) {
                return `${t("Staking.toMin")}: ${formatTinybarToHbar(
                    props.min.minus(props.current)
                )}`;
            } else {
                const difference = props.max.minus(props.current);
                return `${t("Staking.toMax")}: ${formatTinybarToHbar(
                    BigNumber.max(difference, 0)
                )}`;
            }
        });
        const barFill = computed(() => {
            if (props.current.isLessThan(props.min)) {
                const percent = props.current
                    .dividedBy(props.min)
                    .multipliedBy(20)
                    .integerValue();

                return props.current.isZero()
                    ? "0px"
                    : `${BigNumber.max(percent, 5)}px`;
            } else if (props.current.isLessThanOrEqualTo(props.max)) {
                return `${props.current
                    .dividedBy(props.max)
                    .multipliedBy(80)
                    .integerValue()}px`;
            }

            return "90px";
        });

        const hbarIcon = computed(() =>
            isEarning.value ? hbarBlack : hbarFaded
        );
        const statusIcon = computed(() => {
            if (isEarning.value) {
                if (isOverMax.value) {
                    return alertIcon;
                } else {
                    return checkIcon;
                }
            } else {
                return xIcon;
            }
        });

        function formatTinybarToHbar(amount: BigNumber): string {
            const hbar = amount.dividedToIntegerBy(100_000_000);

            if (hbar.isGreaterThanOrEqualTo(1_000_000_000)) {
                return `${hbar.dividedBy(1_000_000_000).toFormat(2)}B`;
            } else if (hbar.isGreaterThanOrEqualTo(1_000_000)) {
                return `${hbar.dividedBy(1_000_000).toFormat(2)}M`;
            } else if (hbar.isGreaterThanOrEqualTo(1_000)) {
                return `${hbar.dividedBy(1_000).toFormat(2)}K`;
            } else {
                return hbar.toFormat();
            }
        }

        return {
            isEarning,
            isOverMax,
            barFill,
            amountTo,
            hbarIcon,
            statusIcon,
        };
    },
});
</script>
